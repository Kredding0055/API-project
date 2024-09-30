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
const { Spot, sequelize, Review } = require('../../db/models');
const { route } = require('./spots');


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
      const err = new Error("message: Review couldn't be found");
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

// const tooManyPictures = async (req, res, next) => {
//     const pics = await spotImage.count({
//         where: {
//             spotImageId: ,
//             reviewId: 
//         }
//     })
//     if(pics > 10) {
//         err = new Error("Maximum number of images for this resource was reached")
//         next(err)
//     }
//     else {
//         next()
//     }
// }

// Get reviews for the current user
router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        include: Spot,
        where: {
            userId: req.user.id
        }
    })
    res.json({'reviews': reviews});
})

// Edit a review
router.put('/:reviewId', requireAuth, exists, isOwned, validateReview, async (req, res, next) => {
    const updatedReview = await req.review.update(req.body)

    res.json(updatedReview)
})

router.post('/:reviewId/images', requireAuth, exists, isOwned )

// Delete a review
router.delete('/:reviewId', requireAuth, exists, isOwned, async (req, res, next) => {
    await req.review.destroy()
    res.json({ "message": "Successfully deleted"})
})
module.exports = router;