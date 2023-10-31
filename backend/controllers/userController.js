const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // if (error.code === 11000) {
        //     return res.status(409).send("Username already exists");
        // }
        console.error('Registration Error:', error);  // Log the error for more details
        res.status(500).json({ error: `Registration failed: ${error.message}` });
    }
};


exports.login = async (req, res) => {

    const users = await User.find();
    console.log(users)
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token)
    res.json({ token, userId: user._id });
};

//get all user list
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

exports.followUser = async (req, res) => {
    const followerId = req.userId;
    const followingId = req.params.userId;

    try {
        const userToFollow = await User.findById(followingId);
        const follower = await User.findById(followerId);

        // Check if already following
        if (userToFollow.followers.includes(followerId)) {
            return res.status(400).json({ message: "You're already following this user" });
        }

        userToFollow.followers.push(followerId);
        follower.following.push(followingId);

        await userToFollow.save();
        await follower.save();

        res.status(200).json({ message: 'Successfully followed the user' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to follow the user' });
    }
};


exports.viewProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password'); // exclude password from being sent
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve profile' });
    }
};

exports.updateProfile = async (req, res) => {
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};


