const ReviewController = require('./review.controller')
const Reviewrouter = require("express").Router();
Reviewrouter.post('/rev', ReviewController.addReview);
Reviewrouter.get('/rev', ReviewController.getReviews);
Reviewrouter.delete('/rev/:id', ReviewController.deleteReview);

module.exports=Reviewrouter;