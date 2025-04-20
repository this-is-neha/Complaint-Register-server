

const Notification = require('./noti.model');

class NotificationVontroller{


    async  getUnseenNotificationsCount (req, res)  {
    try {
      if (!req.user || !req.user._id) {
        return res.status(400).json({ error: 'User not authenticated' });
      }
  
      // Fetch unseen notification count from the database
      const unseenCount = await Notification.countDocuments({ seen: false, userId: req.user._id });
  
      res.status(200).json({ count: unseenCount });
    } catch (error) {
      console.error('Error fetching unseen notifications count:', error);
      res.status(500).json({ error: 'Failed to fetch unseen notifications count' });
    }
  };
}

  module.exports = new NotificationVontroller();