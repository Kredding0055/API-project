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



router.get('/:id', async (req, res, next) => {
    const spotId = await Spot.findByPk(req.params.id);
    // console.log("SPOT SPOT SPOT SPOT SPOT ", spotId)
    if(spotId) {
        res.json(spotId)
    }
    else {
        res.json({"message": "Spot couldn't be found"});
        res.status(404);
    } 
})

router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll()
    res.status(200).json({
      allSpots
    })
})


  // middleware
const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('needs address'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('needs city'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('needs state'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('needs country'),
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('needs name'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('needs description'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('needs latitude'),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('needs longitude'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('needs price'),
    handleValidationErrors
];

//create a spot
router.post('/', validateSpot, async (req, res,) => {
    console.log(req.body)
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
    });

    res.status(201)
    res.json(newSpot)
})

module.exports = router;