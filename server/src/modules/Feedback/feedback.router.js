const  FeedbackMes  = require("./feedback.controller");
const feedbackRouter = require("express").Router();


feedbackRouter.post('/message',FeedbackMes.feedbackform );
feedbackRouter.get('/getid',FeedbackMes.getId );
feedbackRouter.delete('/delete/:id',FeedbackMes.deleteMessage);


module.exports=feedbackRouter