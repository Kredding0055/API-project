// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");
const spotsRouter = require("./spots.js")
const reviewsRouter = require("./reviews.js")
const reviewImageRouter = require("./review-images.js")
const spotImageRouter = require("./spot-images.js")

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/review-images', reviewImageRouter)

router.use('/spot-images', spotImageRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



module.exports = router;


// backend/routes/api/index.js
// ...
// Will use during Mod 5 frontend setup...KR

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });
  
  // ...
// backend/routes/api/index.js
// ...

// Tests the restore user from token...KR
// GET /api/restore-user

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// ...
// GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// ...

// backend/routes/api/index.js
// ...
// tests auth token.... KR
// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// ...