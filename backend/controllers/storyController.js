const Story = require('../models/Story');


exports.createStory = async (req, res) => {
    const { title, content, author } = req.body;

    try {
        const story = new Story({ title, content, author });
        await story.save();

        res.status(201).json(story);
    } catch (error) {
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
    // Like a story logic here...
};

exports.shareStory = async (req, res) => {
    // Share story logic here...
};
