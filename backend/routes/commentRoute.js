const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middlewares/verifytoken');
// Add more controllers and middleware as needed

router.post('/create', commentController.createComment);

router.get('/', commentController.viewAllComments);



router.get('/:storyId', commentController.viewComment);

// router.put('/:storyId', commentController.updateComment);

// router.delete('/:storyId', commentController.deleteComment);

// // router.post('/:storyId/like', commentController.likeComment);

// router.post('/:storyId/unlike', commentController.unlikeComment);







module.exports = router;
