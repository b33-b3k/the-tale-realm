const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Comment', commentSchema);
