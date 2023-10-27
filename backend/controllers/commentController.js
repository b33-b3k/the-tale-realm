const Comment = require('../models/Comment');

const Comment = require('../models/Comment');

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
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve comment' });
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
