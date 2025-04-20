const FeedbackM = require('./feedback.dto');
const mongoose = require('mongoose');

class MessageController {
  feedbackform = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
      const newFeedback = new FeedbackM({ name, email, phone, message });
      await newFeedback.save();

      res.status(200).json({
      
        message: 'Feedback successful',
        feedback: {
          name,
          email,
          phone,
          message
        }
      });
      console.log("Feedback  Successful")
      console.log("Name:",name)
      console.log("Email:",name)
      console.log("Phone:",phone)
      console.log("Message",message)

    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).send('Error submitting Feedback');
    }
  };


getId=async(req,res)=>{
  try {
    const messages = await FeedbackM.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send('Error retrieving messages');
  }
}



  deleteMessage = async (req, res) => {
    const { id } = req.params;
    console.log('Received ID for deletion:', id); // Debugging line
  
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' }); // Validate ID
    }
  
    try {
      const result = await FeedbackM.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      res.status(200).json({ message: 'Message deleted successfully' });
      console.log(`Message with ID ${id} deleted successfully`);
  
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).send('Error deleting message');
    }
  };
  
}

const FeedbackMes = new MessageController();
module.exports = FeedbackMes;
