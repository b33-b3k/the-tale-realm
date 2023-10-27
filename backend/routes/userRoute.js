const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verifytoken'); // <-- Import here
const userController = require('../controllers/userController');


// Registration and Login routes (doesn't require token verification)
router.post('/register', userController.register);
router.post('/login', userController.login);

// Profile endpoints (requires token for some operations)
router.get('/profile/:userId', userController.viewProfile); // Anyone can view a user's profile
router.put('/profile/:userId', verifyToken, userController.updateProfile); // Only authenticated user can update their profile

// Follow another user (requires token)
router.post('/follow/:userId', verifyToken, userController.followUser);

// Unfollow another user (requires token)
// router.post('/unfollow/:userId', verifyToken, userController.unfollowUser);

module.exports = router;