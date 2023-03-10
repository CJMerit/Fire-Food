import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_RESTAURANT_REVIEWS } from '../utils/queries';

const RestaurantReviews = () => {
    const { restaurantId } = useParams();
    const { loading, data } = useQuery(QUERY_RESTAURANT_REVIEWS, {
      variables: { restaurantId: restaurantId }
    })
    const reviews = data?.restaurantReviews || []

    if (loading) {
        return <div>Loading...</div>;
    }

    else if (!reviews.length) {
        return <div>There are no reviews here yet!</div>
    }

    return (
        <div>
            {reviews.map((review) => (
                <div key={review._id} className="card">
                    <p className="card-header">
                        {review.menuItem}
                    </p>
                    <p className="card-body">
                        Written on: {review.date}
                    </p>
                    <p>
                        By: {review.reviewUser}
                    </p>
                    <p>
                        {review.rating}/10
                    </p>
                    <p>
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    )
};

export default RestaurantReviews;