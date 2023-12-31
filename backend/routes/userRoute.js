const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middlewares/verifytoken'); // <-- Import here
const userController = require('../controllers/userController');


// Registration and Login routes (doesn't require token verification)
router.post('/register', userController.register);
router.post('/login', userController.login);

// Get all users (requires token)
router.get('/all-users', userController.getAllUser);

// Profile endpoints (requires token for some operations)
router.get('/profile/:userId', userController.viewProfile); // Anyone can view a user's profile
router.put('/profile/:userId', verifyToken, userController.updateProfile); // Only authenticated user can update their profile

// Follow another user (requires token)
// router.post('/follow/:userId', verifyToken, userController.followUser);

// Unfollow another user (requires token)
router.post('/unfollow/:userId', verifyToken, userController.unfollowUser);

// Get all followers of a user (requires token)
// router.get('/followers/:userId', verifyToken, userController.getUserFollowers);

// Get all users that a user is following (requires token)
router.get('/following/:userId', verifyToken, userController.getUserFollowing);

// Get all stories of a user (requires token)
router.get('/stories/:userId', verifyToken, userController.getUserStories);

// Get all liked stories of a user (requires token)
router.get('/liked-stories/:userId', verifyToken, userController.getUserLikedStories);

// Get all notifications of a user (requires token)
router.get('/notifications/:userId', verifyToken, userController.getUserNotifications);

// add to reading list
router.post('/reading-list/:userId', verifyToken, userController.addStoryToReadingList);


router.post('/forgot_password', userController.forgotPassword);


module.exports = router;