import React from 'react';
import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_USER_REVIEWS } from '../utils/queries';

const UserReviews = () => {

    const { loading, data } = useQuery(QUERY_USER_REVIEWS, {
      variables: { username: Auth.getProfile().data.username }
    })
    const reviews = data?.userReviews || []

    if (loading) {
        return <div>Loading...</div>;
    }

    else if (!reviews.length) {
        return <div>There are no reviews here yet!</div>
    }

    return (
        <div>
            {reviews.map((review) => (
                <div key={review._id} className="card p-2">
                    <p className="card-header">
                        {review.menuItem}
                    </p>
                    <p className="card-body">
                        {review.rating}/10
                    </p>
                    <p className='card-body'>
                        {review.comment}
                    </p>
                    <p className='card-body'>
                        Written on: {review.date}
                    </p>

                </div>
            ))}
        </div>
    )
};

export default UserReviews;