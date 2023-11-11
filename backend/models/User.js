const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // Consider storing a URL if you're using cloud storage like AWS S3
    bio: { type: String, default: '' },
    location: { type: String },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
    likedStories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    genres: [{ type: String }],
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
    readingList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]

});

module.exports = mongoose.model('User', userSchema);
