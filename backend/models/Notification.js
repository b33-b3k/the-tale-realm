const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: { type: String, enum: ['LIKE', 'COMMENT', 'FOLLOW', 'SHARE'] },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' }, // Relevant for LIKE, COMMENT, and SHARE notifications
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, // Relevant for COMMENT notifications
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
