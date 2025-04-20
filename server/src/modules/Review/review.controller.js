const Review = require('./review.dto'); 
const Joi = require("joi");

class ReviewController {
    async addReview(req, res) {
        try {
            const { name, rating, reviewText, date } = req.body;


            const { error } = Joi.object({
                name: Joi.string().min(1).max(24).required(),
                rating: Joi.number().integer().min(1).max(5).required(),
                reviewText: Joi.string().required(),
                date: Joi.date().iso().required()
            }).validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const newReview = new Review({
                name,
                rating,
                reviewText,
                date
            });

            await newReview.save();

            console.log(`Review added: ${newReview.name}, Rating: ${newReview.rating}, Review Text: ${newReview.reviewText}`);
            res.status(200).json(newReview);
        } catch (error) {
            console.error('Error adding review:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getReviews(req, res) {
        try {
            const reviews = await Review.find(); 

            reviews.forEach(review => {
                console.log(`Review - Name: ${review.name}, Rating: ${review.rating}, Review Text: ${review.reviewText}`);
            });

            res.json(reviews);
        } catch (error) {
            console.error('Error getting reviews:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    async deleteReview(req, res) {
      const { id } = req.params;

      try {
          const deletedReview = await Review.findByIdAndDelete(id);
          console.log("Review Delete",deletedReview)
          if (!deletedReview) {
              return res.status(404).json({ error: 'Review not found' });
          }

          res.status(200).json({ message: 'Review deleted successfully', deletedReview });
      } catch (error) {
          console.error('Error deleting review:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }
}

module.exports = new ReviewController();
