//imports the Express.js framework, which is used to create web applications and APIs in Node.js
const express = require('express');
//creates a new router for this route
const router = express.Router();
//imports key functions from utils/auth.js. setTokenCookie creates JWT token, requireAuth verifies 'user' from a token
const { setTokenCookie, requireAuth } = require('../../utils/auth');
//used for validating and sanitizing request data
const { check } = require('express-validator');
//imports a function for handling errors
const { handleValidationErrors } = require('../../utils/validation');
//imports the Spot and Review model
const { Spot, sequelize, Review, ReviewImage, SpotImage, User } = require('../../db/models');



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

const exists = async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    if(review === null) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      next(err)
    }
    else {
      req.review = review;
      next();
    }
}

const isOwned = async (req, res, next) => {
    console.log(req.review)
    if(req.user.id !== req.review.userId) {
      const err = new Error('Require proper authorization: Review must belong to the current user');
      err.status = 403;
      next(err)
    }
    else {
      next();
    }
}

const tooManyPictures = async (req, res, next) => {
    const pics = await ReviewImage.count({
        where: {
            reviewId: req.params.reviewId
        }
    })
    if(pics >= 10) {
        err = new Error("Maximum number of images for this resource was reached")
        err.status = 403
        next(err)
    }
    else {
        next()
    }
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
          console.log(spot[ele])
        }
        else {
          spotReturn.previewImage = null
        }
      });
    //   console.log(spotReturn)
      return spotReturn
    })
    
    return spotObject
  }

  const cleanReview = (allReviews) => {
    const reviewObject = allReviews.map(review => {
        let reviewReturn = {};

        Object.keys(review.dataValues).forEach(ele => {
            if(ele !== "Spot") {
              reviewReturn[ele] = review.dataValues[ele]
            }
            else {
                reviewReturn.Spot = cleanedSpots([review.Spot])[0]
            }
          });
          return reviewReturn
    })
    return reviewObject
  }

// Get reviews for the current user
router.get('/current', requireAuth, async (req, res, next) => {
    let reviews = await Review.findAll({
        include: [{
            model: Spot, 
            include: {
                model: SpotImage
            },
            attributes: [
              "address",
              "city",
              "country",
              "id",
              "lat",
              "lng",
              "name",
              "ownerId",
              "price",
              "state"
            ]
        },{
            model: ReviewImage,
            attributes: [ 'id', 'url']
        },{
          model: User
        },
      ],
        where: {
            userId: req.user.id
        }
    })
    reviews = cleanReview(reviews)
    res.json({'Reviews': reviews});
})

// Edit a review
router.put('/:reviewId', requireAuth, exists, isOwned, validateReview, async (req, res, next) => {
    const updatedReview = await req.review.update(req.body)

    res.json(updatedReview)
})

// Post an image on a review
router.post('/:reviewId/images', requireAuth, exists, isOwned, tooManyPictures, async (req, res, next) => {
    const reviewImage = await ReviewImage.create(Object.assign(req.body, {
        reviewId: req.params.reviewId
    }))
    const imageReturn = {};
  ({id: imageReturn.id, url: imageReturn.url} = reviewImage)
    res.status(201).json(imageReturn);
} )

// Delete a review
router.delete('/:reviewId', requireAuth, exists, isOwned, async (req, res, next) => {
    await req.review.destroy()
    res.json({ "message": "Successfully deleted"})
})
module.exports = router;