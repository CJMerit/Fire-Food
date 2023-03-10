import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query Query {
        user {
            _id
            username
            email
            reviews {
                _id
                comment
                date
                menuItem
                rating
                restaurantId {
                    _id
                    name
                    zipcode
                }
            }
        }
    }
`;

export const QUERY_RESTAURANTS = gql`
query getRestaurants($name: String!, $zipcode: String!) {
    restaurants(name: $name, zipcode: $zipcode) {
      _id
      name
      zipcode
      reviews {
        _id
        reviewUser
        comment
        date
        menuItem
        rating
      }
    }
  }
`;

export const QUERY_SINGLE_RESTAURANT = gql`
query getRestaurant($restaurantId: ID!) {
    restaurant(restaurantId: $restaurantId) {
      _id
      name
      zipcode
      reviews {
        _id
        reviewUser
        comment
        date
        menuItem
        rating
      }
    }
  }
`

export const QUERY_RESTAURANT_REVIEWS = gql`
query getRestaurantReviews($restaurantId: String!) {
  restaurantReviews(restaurantId: $restaurantId) {
    reviewUser
    date
    menuItem
    rating
    comment
  }
}
`

export const QUERY_USER_REVIEWS = gql`
query getUserReviews($username: String!) {
  userReviews(username: $username) {
    restaurantId
    date
    menuItem
    rating
    comment
  }
}
`