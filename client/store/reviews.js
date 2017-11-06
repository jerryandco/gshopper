import axios from 'axios';
// import history from '../history';
//will we reroute?

const GET_REVIEWS = 'GET_REVIEWS';
const POST_REVIEW = 'POST_REVIEW';
const PUT_REVIEW = 'PUT_REVIEW';

/**
 * ACTION CREATORS
 */
const getReviewsAction = reviews => ({ type: GET_REVIEWS, reviews });
const postReviewAction = review => ({ type: POST_REVIEW, review });
const putReviewAction = review => ({
  type: PUT_REVIEW,
  review
});

export default function(reviews = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return reviews;
    case POST_REVIEW:
      return [...reviews, action.review];
    case PUT_REVIEW:
      var otherReviews = reviews.filter(review => review.id !== action.review.id);
      return [action.review, ...otherReviews];
    default:
      return reviews;
  }
}

//THUNK CREATOR

export const fetchReviews = () => {
  return dispatch => {
    return axios
      .get('/api/reviews')
      .then(res => res.data)
      .then(review => {
        const action = getReviewsAction(review);
        dispatch(action);
      })
      .catch(console.error);
  };
};

export const postReviews = review => dispatch => {
  axios
    .post('/api/reviews', review)
    .then(res => {
      dispatch(postReviewAction(res.data));
      // history.push(`/reviews`);
    })
    .catch(err =>
      console.error(`Creating review: ${review} unsuccessful`, err)
    );
};

export const putReview = review => {
  return dispatch => {
    return axios
      .put(`/api/reviews/${review.id}`, review)
      .then(res => {
        return res.data;
      })
      .then(updatedReview => {
        const action = putReviewAction(updatedReview);
        dispatch(action);
      })
      .catch(console.error);
  };
};
