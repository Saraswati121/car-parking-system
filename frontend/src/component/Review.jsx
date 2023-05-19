import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Review = ({ serviceRequestId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createReview = async (e) => {
    e.preventDefault();
    try {
      const newReview = { rating, comment };
      await axios.post(`http://localhost:8080/users/reviews/${serviceRequestId}`, newReview);
      fetchReviews();
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Reviews</h1>
      <form onSubmit={createReview}>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Review</button>
      </form>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <strong>User:</strong> {review.user.userName}, {review.user.email}
            <br />
            <strong>Rating:</strong> {review.rating}
            <br />
            <strong>Comment:</strong> {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};
