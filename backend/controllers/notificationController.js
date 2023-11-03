const Notification = require('../models/Notification');

exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.params.userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// ... Similarly, you can flesh out other methods.

exports.markNotificationAsRead = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        notification.read = true;
        await notification.save();
        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};

const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
    try {
        // Extract necessary data from the request body
        const { recipient, content, ...otherData } = req.body;
        const newNotification = new Notification({
            recipient,
            content,
            ...otherData, // You can add other relevant fields here
        });
        await newNotification.save();
        res.json(newNotification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

