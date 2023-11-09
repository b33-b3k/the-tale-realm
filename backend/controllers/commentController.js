const Comment = require('../models/Comment');


exports.viewAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
}


exports.createComment = async (req, res) => {
    const { content, story, author } = req.body;

    try {
        const comment = new Comment({ content, story, author });
        await comment.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post comment' });
    }
};

// ... Similarly, you can flesh out other methods.

exports.viewComment = async (req, res) => {
    try {
        const { storyId } = req.params;

        // Assuming the Comment model has a 'story' field that contains the 'storyId'
        const comments = await Comment.find({ story: storyId });

        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'Comments not found for the specified story' });
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve comments for the specified story' });
    }
};


exports.updateComment = async (req, res) => {
    const updates = req.body;
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, updates, { new: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
};


exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndRemove(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};
