import axios from 'axios';
import history from '../history';

const GET_CANDIES = 'GET_CANDIES';
const POST_CANDY = 'POST_CANDY';
const DELETE_CANDY = 'DELETE_CANDY';
const PUT_CANDY = 'PUT_CANDY';

const getCandies = candies => ({ type: GET_CANDIES, candies });
const postCandy = candy => ({ type: POST_CANDY, candy });
const deleteCandy = candy => ({ type: DELETE_CANDY, candy });
const putCandy = candy => ({ type: PUT_CANDY, candy });

export default function(candies = [], action) {
  switch (action.type) {
    case GET_CANDIES:
      return action.candies;
    case POST_CANDY:
      return [action.candy, ...candies];
    case PUT_CANDY:
      var otherCandy = candies.filter(candy => candy.id !== action.candy.id);
      return [action.candy, ...otherCandy];
    case DELETE_CANDY:
      return candies.filter(candy => candy.id !== action.candy.id);
    default:
      return candies;
  }
}

export function fetchCandies() {
  return function thunk(dispatch) {
    return axios
      .get('/api/candies')
      .then(res => res.data)
      .then(candies => {
        const action = getCandies(candies);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
}

export const postCandyThunk = (newCandy, history) => {
  return dispatch => {
    return axios
      .post('/api/candies', newCandy)
      .then(res => {
        return res.data;
      })
      .then(candy => {
        const action = postCandy(candy);
        dispatch(action);
        //here we should return to a specific url related to admin
      })
      .catch(console.error);
  };
};

export const putCandyThunk = candy => {
  return dispatch => {
    return axios
      .put(`/api/candies/${candy.id}`, candy)
      .then(res => {
        return res.data;
      })
      .then(changedCandy => {
        const action = putCandy(changedCandy);
        dispatch(action);
        //history or not?
      })
      .catch(console.error);
  };
};

export const deleteCampusThunk = id => {
  return dispatch => {
    return axios.delete(`/api/candies/${id}`).then(candy => {
      candy.id = +id;
      const action = deleteCandy(candy);
      dispatch(action);
    });
  };
};
