const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // Consider storing a URL if you're using cloud storage like AWS S3
    bio: { type: String, default: '' },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
    likedStories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);
