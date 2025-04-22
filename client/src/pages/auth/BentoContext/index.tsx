// BentoContext.tsx (Updated)
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Review {
  _id: string;
  name: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface ReviewsContextType {
  reviews: Review[];
  fetchReviews: () => void;
  handleSubmit: (newReview: Omit<Review, '_id'>) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  error: string | null;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const useReviewsContext = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviewsContext must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get<Review[]>('http://localhost:9006/review/rev');
      setReviews(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching reviews:', error.message);
        setError('Failed to fetch reviews. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred.');
      }
    }
    
  };

  const handleSubmit = async (newReview: Omit<Review, '_id'>) => {
    try {
      const response = await axios.post<Review>('http://localhost:9006/review/rev', newReview);
      setReviews((prevReviews) => [...prevReviews, response.data]);
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:9006/review/rev/${id}`);
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Failed to delete review. Please try again.');
      throw error;
    }
  };

  return (
    <ReviewsContext.Provider value={{ reviews, fetchReviews, handleSubmit, handleDelete, error }}>
      {children}
    </ReviewsContext.Provider>
  );
};
