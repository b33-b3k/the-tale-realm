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

//follow user
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
exports.getUserStories = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('stories');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.stories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user stories' });
    }
};

exports.getUserLikedStories = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('likedStories');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.likedStories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve liked stories' });
    }
};

exports.getUserReadingList = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('readingList');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.readingList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reading list' });
    }
};

exports.addStoryToReadingList = async (req, res) => {
    const userId = req.userId;
    const storyId = req.params.storyId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.readingList.includes(storyId)) {
            return res.status(400).json({ message: 'Story already added to reading list' });
        }
        user.readingList.push(storyId);
        await user.save();
        res.status(200).json({ message: 'Story added to reading list' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add story to reading list' });
    }
};

exports.getUserFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('following');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.following);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve following list' });
    }
};

exports.getUserLikedStories = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('likedStories');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.likedStories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve liked stories' });
    }
};

// ... (other controller functions)




