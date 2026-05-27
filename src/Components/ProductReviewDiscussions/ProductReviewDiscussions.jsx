import React, { useState } from "react";
import "./ProductReviewDiscussions.css";

const ProductReviewDiscussions = ({ productId }) => {
  const [reviews, setReviews] = useState([
    { id: 1, user: "Alice", rating: 5, comment: "Great quality!" },
    { id: 2, user: "Bob", rating: 4, comment: "Very comfortable." },
  ]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([
      ...reviews,
      { id: Date.now(), user: "Guest", rating, comment },
    ]);
    setComment("");
    setRating(5);
  };

  return (
    <div className="product-reviews">
      <h3>Detail Review Discussions</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          Rating:
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      <div className="reviews-list">
        {reviews.map((r) => (
          <div className="review-item" key={r.id}>
            <div className="review-user">{r.user}</div>
            <div className="review-rating">
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </div>
            <div className="review-comment">{r.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviewDiscussions;
