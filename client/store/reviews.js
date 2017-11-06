import axios from 'axios';

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
  