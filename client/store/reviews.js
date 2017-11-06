import axios from 'axios';
<<<<<<< HEAD
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
=======

const GET_REVIEWS = 'GET_REVIEWS';
const POST_REVIEWS = 'POST_REVIEWS';
const PUT_REVIEWS = 'PUT_REVIEWS';

const getReviewsAction = reviews => ({
    type: GET_REVIEWS,
    reviews
});

const postReviewsAction = review => ({
    type: POST_REVIEWS,
    review
});

const putReviewsAction = review => ({
    type: PUT_REVIEWS,
    review
});

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

export const postReviews = (review) => {
    return dispatch => {
        return axios
            .post('/api/orders', review)
            .then(res => {
                return res.data;
            })
            .then(createdReview => {
                const action = postReviewsAction(createdReview);
                dispatch(action);
                //figure out history in future
                // history.push(`/orders/${order.id}`);
            })
            .catch(console.error);
    };
};

export const putReviews = review => {
    return dispatch => {
      return axios
        .put(`/api/orders/${review.id}`, review)
        .then(res => {
          return res.data;
        })
        .then(updatedReview => {
          const action = putReviewsAction(updatedReview);
          dispatch(action);
        })
        .catch(console.error);
    };
  };
  
>>>>>>> e5babd3a8a7f54b3e6d03099030ca7ac1b901859
