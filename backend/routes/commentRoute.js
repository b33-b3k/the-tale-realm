const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const verifyToken = require('../middlewares/verifytoken');
const commentController = require('../controllers/commentController');
// Add more controllers and middleware as needed

router.post('/create', commentController.createComment);

router.get('/:storyId', commentController.viewComment);

router.put('/:storyId', commentController.updateComment);

router.delete('/:storyId', commentController.deleteComment);

// router.post('/:storyId/like', commentController.likeComment);

router.post('/:storyId/unlike', commentController.unlikeComment);







module.exports = router;
