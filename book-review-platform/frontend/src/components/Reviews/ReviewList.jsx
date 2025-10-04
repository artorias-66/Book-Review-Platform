import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div>
            <h3>Reviews</h3>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                reviews.map(review => (
                    <div key={review._id} className="review">
                        <h4>{review.userId.name}</h4>
                        <p>Rating: {review.rating}</p>
                        <p>{review.reviewText}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewList;
