import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import './style.css';
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
    if (!rating || !comment  ) {
			alert('Please fill in all details');
			return;
		  }
    try {
      const newReview = { rating, comment };
      const response = await axios.post('http://localhost:8080/users/reviews', newReview);
      const createdReview = response.data.review;
      setReviews([...reviews, createdReview]);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
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
        <button type="submit" id="adbtn">
          Create Review
        </button>
      </form>
      <div style={{marginTop:"10px"}}>
        <div>
          {reviews.map((review) => (
            <div key={review._id}>
              <strong>Rating:</strong> {review.rating}
              <br />
              <strong>Comment:</strong> {review.comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
