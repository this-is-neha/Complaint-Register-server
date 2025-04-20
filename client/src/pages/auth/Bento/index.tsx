// Bento.tsx (Updated)
import React, { useState } from 'react';
import { useReviewsContext } from '../BentoContext';
import { HeaderComponent, FooterComponent } from "../../../components/common";

const Bento = () => {
  const { reviews, handleSubmit, handleDelete, error } = useReviewsContext();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newReview = {
      name,
      rating,
      reviewText,
      date: new Date().toISOString(),
    };

    try {
      await handleSubmit(newReview);
      setName('');
      setRating(1);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className="max-w-4xl mx-auto bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">User Reviews</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div key={review._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-bold">{review.name}</span>
                <span className="text-gray-500 text-sm">{review.date}</span>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
              <div className="text-yellow-500">
                {'⭐'.repeat(review.rating)}
              </div>
              <p className="mt-2">{review.reviewText}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Add a Review</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                id="rating"
                name="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num} Star{num !== 1 && 's'}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
              <textarea
                id="review"
                name="review"
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit Review</button>
          </form>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Bento;
