// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

// backend/routes/api/users.js
// ...
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage( "Invalid email"),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage( "Username is required"),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({checkFalsy: true})
      .withMessage("First Name is required"),
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage("Last Name is required"),
    handleValidationErrors
];

// backend/routes/api/users.js
// ...

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    try {
        
        const user = await User.create({ firstName, lastName, email, username, hashedPassword });

        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.status(201).json({
            user: safeUser
        });
      } 
      catch (e)  {
        const err = new Error('User already exists');
        err.status = 500;
        if(e.errors.filter(e => e.path === 'email').length > 0) {
            err.errors = { "email": "User with that email already exists"}
        }
        if(e.errors.filter(e => e.path === 'username').length > 0) {
            err.errors = {"username": "User with that username already exists"}
        }
        next(err);
      }
  },
  
);


module.exports = router;