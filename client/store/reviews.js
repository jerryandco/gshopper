import axios from 'axios';
// import history from '../history';
//will we reroute?

const GET_REVIEWS = 'GET_REVIEWS';
const POST_REVIEW = 'POST_REVIEW';

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
const postReview = review => ({ type: POST_REVIEW, review });



export default function (reviews = [], action) {
      switch (action.type) {
        case GET_REVIEWS:
          return reviews
        case POST_REVIEW :
          return [...reviews, action.review];
        default:
          return reviews
      }
}

//THUNK CREATOR

export function fetchReviews() {
  return function thunk(dispatch) {
    return axios
      .get('/api/reviews')
      .then(res => res.data)
      .then(reviews => {
        const action = getReviews(reviews);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
}

export const postReviews = review => dispatch => {
  axios
    .post('/api/reviews', review)
    .then(res => {
      dispatch(postReview(res.data))
      // history.push(`/reviews`);
    })
    .catch(err =>
      console.error(`Creating review: ${review} unsuccessful`, err)
    );
};
