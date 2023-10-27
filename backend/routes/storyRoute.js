const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const verifyToken = require('../middlewares/verifytoken');
const authenticate = require('../middlewares/authenticate');



// Story CRUD
router.post('/create', verifyToken, storyController.createStory);
router.get('/:storyId', storyController.viewStory);
router.put('/:storyId', verifyToken, storyController.updateStory);
router.delete('/:storyId', verifyToken, storyController.deleteStory);

// Like and Unlike a story
router.post('/:storyId/like', verifyToken, storyController.likeStory);
// router.post('/:storyId/unlike', verifyToken, storyController.unlikeStory);

// Comments on a story
// router.post('/:storyId/comment', verifyToken, storyController.commentOnStory);
// router.delete('/:storyId/comment/:commentId', verifyToken, storyController.deleteComment);

//share
router.post('/:storyId/share', verifyToken, storyController.shareStory);

module.exports = router;
