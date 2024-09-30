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

const { ReviewImage } = require('../../db/models')

const isOwned = async (req, res, next) => {

    if(req.user.id !== req.reviewImage.Review.userId) {
      const err = new Error('Require proper authorization: Spot must belong to the current user');
      err.status = 403;
      next(err)
    }
    else {
      next();
    }
  }

  const exists = async (req, res, next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
  
    if(reviewImage === null) {
      const err = new Error("message: Review image couldn't be found");
      err.status = 404;
      next(err)
    }
    else {
      req.reviewImage = reviewImage;
      next();
    }
  }


router.delete('/:imageId', requireAuth, exists, isOwned, async (req, res, next) => {
    await req.reviewImage.destroy()
    res.json({ "message": "Successfully deleted"})
})

module.exports = router;