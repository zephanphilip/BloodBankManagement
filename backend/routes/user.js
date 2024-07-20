const express = require('express');
const { signupUser, loginUser, addNotification, getNotifications } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/signup', signupUser);

// Protected routes
router.use(requireAuth);

router.get('/notifications', getNotifications);
router.post('/notifications', addNotification);

module.exports = router;

// const express = require('express');

// const { signupUser, loginUser, addNotification, getNotifications} = require('../controllers/userController');

// const router = express.Router();



// // login routes
// router.post('/login',loginUser);

// // signup routes
// router.post('/signup',signupUser);


// // Get notifications for the logged-in user
// router.get('/notifications', getNotifications);

// // Add a notification
// router.post('/notifications', addNotification);

// module.exports = router