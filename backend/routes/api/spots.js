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
const { Spot } = require('../../db/models');

router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll()
    res.status(200).json({
      allSpots
    })
  })

module.exports = router;