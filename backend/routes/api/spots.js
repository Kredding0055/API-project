//imports the Express.js framework, which is used to create web applications and APIs in Node.js
const express = require('express')
//creates a new router for this route
const router = express.Router();
//Used for hashing passwords
const bcrypt = require('bcryptjs');
//imports key functions from utils/auth.js. setTokenCookie creates JWT token, requireAuth verifies 'user' from a token
const { setTokenCookie, requireAuth } = require('../../utils/auth');
//used for validating and sanitizing request data
const { check } = require('express-validator');
//imports a function for handling errors
const { handleValidationErrors } = require('../../utils/validation');
//imports the Spot model
const { Spot, sequelize, Review } = require('../../db/models');



// Get all spots owned by current user
router.get('/current', requireAuth, async (req, res, next) => {
  const ownerSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })
  res.json(ownerSpots);
});

router.get('/:spotId', async (req, res, next) => {
    const spotId = await Spot.findByPk(req.params.spotId,
        {
        include: [{
            model: Review,
            attributes: [],
        } ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            ],
        },
        group: [
          'Spot.id'
        ],
    });
    if(spotId) {
        res.json(spotId)
    }
    else {
        res.json({"message": "Spot couldn't be found"});
        res.status(404);
    } 
})

router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        include: [{
            model: Review,
            attributes: [],
        } ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            ],
        },
        group: [
            'Spot.id'
        ],
    });
    res.status(200).json({
      allSpots
    })
})


  // middleware
const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage( "Street address is required"),
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
    // console.log(req.body)
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

const exists = async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if(spot === null) {
    const err = new Error("message: Spot couldn't be found");
    err.status = 404;
    next(err)
  }
  else {
    req.spot = spot;
    next();
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