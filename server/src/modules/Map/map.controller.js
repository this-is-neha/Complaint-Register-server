
const Location = require('./map.dto');
const mongoose = require('mongoose');

class Map {
 

  MapController = async (req, res) => {
    const { lat, lng, message, placeName, category, userId } = req.body; // Extract userId from the request body
    console.log('Received coordinates:', lat, lng);
    console.log("Message", message);
    console.log("Place", placeName);
    console.log("Category", category);
    console.log("User ID", userId); // Debug log for userId

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
      const newCoordinate = new Location({ lat, lng, message, placeName, category, userId }); // Include userId in the new Location
      const savedCoordinate = await newCoordinate.save();
      res.status(200).json(savedCoordinate);
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  getByUserId = async (req, res) => {
    console.log("Request params:", req.params);
    
    const { userid } = req.params;
    console.log("Received userId:", userid);
    
    // Validate userId format
    if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  
    try {
      console.log("Valid userId, querying the database...");
  
      // Query for complaints using userId, make sure to use `new` when creating ObjectId
      const userComplaints = await Location.find({ userId: new mongoose.Types.ObjectId(userid) });
  
      console.log("Query result:", userComplaints);
  
      if (!userComplaints || userComplaints.length === 0) {
        return res.status(404).json({ message: "No complaints found for this user" });
      }
  
      res.status(200).json(userComplaints);
    } catch (error) {
      console.error("Error fetching complaints for user:", error);
      res.status(500).json({ message: "Error retrieving user complaints" });
    }
  };
  
  
  

  getId = async (req, res) => {
    const { category } = req.query;
    try {
      const query = category ? { category } : {};
      const messages = await Location.find(query).populate('userId'); // Populate to get user details
  
      console.log('Retrieved complaints:', messages);
  
      // Optionally format the messages if you want specific fields in the response
      const responseMessages = messages.map(message => ({
        _id: message._id,
        message: message.message,
        lat: message.lat,
        lng: message.lng,
        placeName: message.placeName,
        category: message.category,
        userId: message.userId ? message.userId._id : null, // Adjust based on how you want to return userId
        timestamp: message.timestamp,
      }));
  
      res.status(200).json(responseMessages); // Send formatted messages
    } catch (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).send('Error retrieving messages');
    }
  };


  deleteMessage = async (req, res) => {
    const { id } = req.params;
    console.log('Received ID for deletion:', id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
      const result = await Location.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ message: 'Complaint not found' });
      }

      res.status(200).json({ message: 'Complaint deleted successfully' });
      console.log(`Complaint with ID ${id} deleted successfully`);

    } catch (error) {
      console.error('Error deleting Complaint:', error);
      res.status(500).send('Error deleting Complaint');
    }
  };

  getAll = async (req, res) => {
    try {
      const complaints = await Location.find();
      console.log("Complaints are", complaints);
      res.json(complaints);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      res.status(500).json({ message: err.message });
    }
  };
  read = async (req, res) => {
    try {
      const unseenCount = await Complaint.countDocuments({ isRead: false });
      res.status(200).json({ unseenCount });
    } catch (error) {
      console.error("Error fetching unseen count:", error);
      res.status(400).json({ error: "Invalid request. Could not fetch unseen complaints." });
    }
  };
  
}

const MapCtrl = new Map();
module.exports = MapCtrl;
