const Story = require('../models/Story');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.createStory = async (req, res) => {
    const { title, content } = req.body;
    const author = req.userId; // Ensure this is declared with const or let
    console.log("userid" + author)

    try {
        // Create and save the new story
        const story = new Story({ title, content, author });

        await story.save();

        // Find the user by ID and update their stories array
        await User.findByIdAndUpdate(
            author,
            { $push: { stories: story._id } }, // Push the new story's ID to the user's stories array
            { new: true, useFindAndModify: false } // Return the updated user object and use the new method for findByIdAndUpdate
        );

        // Respond with the created story
        res.status(201).json(story);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create story' });
    }
};

exports.viewStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        res.json(story);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch story' });
    }
};

exports.updateStory = async (req, res) => {
    const updates = req.body;
    try {
        const story = await Story.findByIdAndUpdate(req.params.storyId, updates, { new: true });
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update story' });
    }
};

exports.deleteStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndRemove(req.params.storyId);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete story' });
    }
};



exports.likeStory = async (req, res) => {
    try {
        // Check if the user object and userId is present
        if (!req.userId) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        const userId = req.userId;
        console.log('User ID:', userId);

        const story = await Story.findById(req.params.storyId);
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        // Check if user has already liked the story
        const index = story.likes.indexOf(userId);
        if (index === -1) {
            story.likes.push(userId);
        } else {
            story.likes.splice(index, 1);
        }

        await story.save();
        res.status(200).json(story);

    } catch (error) {
        console.error('Error in likeStory:', error.message); // This will log the detailed error message
        res.status(500).json({ error: 'Failed to like/unlike the story', details: error.message });
    }
};


exports.shareStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.storyId);
        if (!story) {
            console.error('Story not found');
            return res.status(404).json({ error: 'Story not found' });
        }
        if (!req.userId) {
            console.error('User not authenticated');
            return res.status(400).json({ error: 'User not authenticated' });
        }

        const userId = req.userId;
        console.log('User ID:', userId);

        // Add the user's ID to sharedBy
        story.sharedBy.push(userId);

        await story.save();

        console.log('Story shared successfully');
        res.status(200).json(story);
    } catch (error) {
        console.error('Failed to share the story:', error);
        res.status(500).json({ error: 'Failed to share the story' });
    }
};


exports.commentStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Content is required for a comment' });
        }

        // Check if the story exists
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        const author = req.userId; // Assuming you have user information in the request

        // Create a new comment
        const comment = new Comment({
            content,
            author,
            story: story._id  // Set the story field to the ID of the story
        });

        // Save the comment
        await comment.save();

        // Push the comment's ID to the story's comments array
        story.comments.push(comment._id);
        await story.save();

        // Return the newly created comment
        res.status(200).json(comment);
    } catch (error) {
        console.error('Failed to comment on the story:', error);
        res.status(500).json({ error: 'Failed to comment on the story', details: error.message });
    }
};

exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
};

exports.searchStory = async (req, res) => {
    try {
        const titleQuery = new RegExp(req.query.title, 'i');
        const author = await User.find({ username: { $regex: titleQuery } });
        const stories = await Story.find({ title: { $regex: titleQuery } });
        
        const authors = author
        const story = stories

        const final_response= {
            authors : authors,
            stories : story
        }

        if (!final_response){
            return res.status(404).json({ error: 'Story not found' });
        }
        res.status(200).json(final_response);
    } catch (error) {
        console.error('Failed:', error);
        res.status(500).json({ error: 'Failed to search for stories' });
    }
}
