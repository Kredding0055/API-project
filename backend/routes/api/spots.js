//imports the Express.js framework, which is used to create web applications and APIs in Node.js
const express = require('express')
//creates a new router for this route
const router = express.Router();
//imports key functions from utils/auth.js. setTokenCookie creates JWT token, requireAuth verifies 'user' from a token
const { setTokenCookie, requireAuth } = require('../../utils/auth');
//used for validating and sanitizing request data
const { check } = require('express-validator');
//imports a function for handling errors
const { handleValidationErrors } = require('../../utils/validation');
//imports the Spot and Review model
const { Spot, sequelize, Review, User, SpotImage, ReviewImage, Sequelize } = require('../../db/models');
const { Op } = require('sequelize')

const avgRating = (spot) => {
  let reviewCount = spot.Reviews.length
  if(reviewCount > 0){
    return spot.Reviews.map(review => review.stars).reduce((p, c) => p + c) /reviewCount;
  }
  return 0;
}

const cleanedSpots = (allSpots) => {
  const spotObject = allSpots.map(spot => {
    let spotReturn = {};

    Object.keys(spot.dataValues).forEach(ele => {
      if(ele !== "SpotImages") {
        spotReturn[ele] = spot.dataValues[ele]
      }
      else if(spot[ele].filter(i => i.dataValues.preview).length > 0) {
        spotReturn.previewImage = spot.SpotImages.filter(x => x.dataValues.preview)[0].dataValues.url
      }
      else {
        spotReturn.previewImage = null
      }
    });
    if(spotReturn.avgRating === undefined) {
      spotReturn.avgRating = avgRating(spotReturn)
    }
    return spotReturn
  })
  return spotObject
}
const exists = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if(spot === null) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    next(err)
  }
  else {
    req.spot = spot;
    next();
  }
}

const reviewExistsForUser = async (req, res, next) => {
  const reviews = await Review.count({
    where: {
      userId: req.user.id,
      spotId: req.spot.id
    }
  })
  if(reviews > 0) {
    err = new Error("User already has a review for this spot")
    next(err)
  }
  else {
    next()
  }
}

const isOwned = async (req, res, next) => {

  if(req.user.id !== req.spot.ownerId) {
    const err = new Error('Require proper authorization: Spot must belong to the current user');
    err.status = 403;
    next(err)
  }
  else {
    next();
  }
}

const validateReview = [
  check('review')
    .exists({checkFalsy: true})
    .withMessage("Review text is required"),
  check('stars')
    .exists({ checkFalsy: true})
    .isInt({min: 1, max: 5})
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];

// Get all spots owned by current user
router.get('/current', requireAuth,  async (req, res, next) => {
  const ownerSpots = await Spot.findAll({
    where:{
      ownerId: req.user.id
    },
    include: [{
      model: Review,
      attributes: [],
  }, {
      model: SpotImage,
      attributes: ['url','preview'],
  } ],
  attributes: {
      include: [
          [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
      ],
  },
  group: [
      'Spot.id',
      'SpotImages.id'
  ],
});
  spotObject = cleanedSpots(ownerSpots)
  res.json({"Spots": spotObject});
});

// Get reviews on a spot
router.get('/:spotId/reviews', exists, async (req, res, next) => {
  const reviews = await Review.findAll({
    include: [
      { model: User,
        attributes: [ 'id', 'firstName', 'lastName']
      }, 
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ],
    where: {
      spotId: req.params.spotId
    }
  })
  res.json({'Reviews': reviews});
})

router.post('/:spotId/images', requireAuth, exists, isOwned, async (req, res, next) => {
  const image = await SpotImage.create(Object.assign(
    req.body,
    {
      spotId: req.spot.id,
    }
  ))
  const imageReturn = {};
  ({id: imageReturn.id, url: imageReturn.url, preview: imageReturn.preview} = image)
  res.status(201).json(imageReturn)
})

// Post a review on a spot
router.post('/:spotId/reviews', requireAuth, exists, reviewExistsForUser, validateReview, async (req, res, next) => {
  const review = await Review.create(Object.assign(
    req.body,
    {
     userId: req.user.id,
     spotId: req.spot.id
    },
  ));

  
  res.status(201).json(review);
})

// Get a spot by it's ID
router.get('/:spotId', exists, async (req, res, next) => {
    const spotId = await Spot.findByPk(req.params.spotId,
        {
        include: [{
            model: Review,
            attributes: [],
        }, {
          model: SpotImage,
          attributes: ['id', 'preview', 'url']
        },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }
      ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
                [sequelize.fn('COUNT', sequelize.col('Reviews.stars')), 'numReviews']
            ],
        },
        group: [
          'Spot.id',
          'SpotImages.id',
          'Owner.id'
        ],
    });
    if(spotId) {
        res.json(spotId)
    }
})

// Get all spots
router.get('/', async (req, res, next) => {
    console.log(req.query)
    let where = {}
    if (req.query.minLat) {
      where.lat = { [Op.gt] : req.query.minLat};
    }
    if(req.query.maxLat) {
      where.lat = { [Op.lt] : req.query.maxLat}
    }
    if(req.query.minPrice) {
      where.price = {[Op.gt] : req.query.minPrice}
    }
    if(req.query.maxPrice) {
      where.price = { [Op.lt] : req.query.maxPrice}
    }
    let page = req.query.page || 1
    let size = req.query.size || 20
    const allSpots = await Spot.findAll({
        include: [{
            model: Review,
            attributes: ['stars'],
        }, {
            model: SpotImage,
            attributes: ['id', 'url', 'preview'],
        } ],
        
        limit: size,
        where: where,
        offset: size * (page - 1)
    });
    spotObject = cleanedSpots(allSpots)
    res.status(200).json({
     "Spots": spotObject, page, size
    })
})

  // middleware
const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check('name')
      .exists({ checkFalsy: true })
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('needs description'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage("Longitude is not valid"),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
    handleValidationErrors
];

//create a spot
router.post('/', requireAuth, validateSpot, async (req, res,) => {
    //get all info from req body
    const {address, city, state, country, name, description, lat, lng, price} = req.body;
    //create new instance of spot
    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        name,
        description,
        lat,
        lng,
        price,
        ownerId: req.user.id
    });

    res.status(201)
    res.json(newSpot)
});


// Edit a spot
router.put('/:spotId', requireAuth, exists, isOwned, validateSpot, async (req, res, next) => {
  const updated = await req.spot.update(req.body)

  res.json(updated)
})

// Delete a spot
router.delete('/:spotId', requireAuth, exists, isOwned, async (req, res, next) => {
  await req.spot.destroy()
  res.json({ "message": "Successfully deleted"})
}) 

module.exports = router;