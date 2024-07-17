import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import styles from "../styles/Reviews.module.css";
const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchedReviews = [];
    setReviews(fetchedReviews);
  }, [productId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() !== "") {
      const review = {
        userId: currentUser.uid,
        userName: currentUser.email,
        content: newReview,
        date: new Date().toString(),
      };
      setReviews([...reviews, review]);
      setNewReview("");
    }
  };

  return (
    <div className={styles.reviews}>
        <h3>Reviews</h3>
        {reviews.map((review ,  index ) => (
            <div key={index} className={styles.review}>
                <p>{review.content}</p>
                <small>
                    {review.userName} - {new Date(review.date).toLocaleString()}
                </small>

            </div>
        ))}
        {currentUser && (
            <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
                <textarea
                value={newReview}
                onChange  = {(e) => setNewReview(e.target.value)}
                placeholder="Write your review... "
                required  
                >

                </textarea>
                <button type="submit"> Submit Review </button>

            </form>
        )}
        
    </div>

    );
};

export default Reviews;
