const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({

  name: { 
    type: String,
     required: true 
    },
  email: { 
    type: String, 
    required: true
   },
  phone: {
     type: String,
      required: true 
    },
  message: { 
    type: String, 
    required: true
   },
   }, 
   { timestamps: true });

const FeedbackM = mongoose.model('FeedbackM', feedbackSchema);
module.exports = FeedbackM;