// routes/notificationRoutes.js

const express = require('express');
const { getUnseenNotificationsCount } = require('./noti.controller');
//const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch unseen notifications count for the logged-in user
router.get('/unseenCount', getUnseenNotificationsCount);

module.exports = router;
