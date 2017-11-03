import axios from 'axios';
import history from '../history';

const GET_CANDIES = 'GET_CANDIES'
const POST_CANDY = 'POST_CANDY';
const DELETE_CANDY = 'DELETE_CANDY';
const PUT_CANDY = 'PUT_CANDY';

const candiesAction = candies => ({ type: GET_CANDIES, candies })
const postCandyAction = candy => ({ type: POST_CANDY, candy });
const deleteCandyAction = id => ({ type: DELETE_CANDY, id });
const putCandyAction = candy => ({ type: PUT_CANDY, candy });

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
      .catch(err => console.error(err))
  }
}

export const postCandyThunk = (candy, categories) => {
  return dispatch => {
    const ObjectToSend = {
      candy: candy,
      categories: categories
    }
    return axios
      .post('/api/candies', ObjectToSend)
      .then(res => {
        return res.data;
      })
      .then(createCandy => {
        const action = postCandyAction(createCandy);
        dispatch(action);
        history.push('/');
      })
      .catch(console.error);
  };
};

export const deleteCandyThunk = id => {
  return dispatch => {
    return axios.delete(`/api/candies/${id}`)
      .then( () => {
      const action = deleteCandyAction(id);
      dispatch(action);
    });
  };
};
