
const { required } = require('joi');
const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  category:{
type:String,
required:true
  },
  message: {
    type: String,
    required:true
  },
  placeName:{
type:String

  },
  userid: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required:true
  
  },
 
  isRead: { type: Boolean, default: false },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
 
});

module.exports = mongoose.model('Location', LocationSchema);
