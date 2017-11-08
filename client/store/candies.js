import axios from 'axios';
import history from '../history';

const GET_CANDIES = 'GET_CANDIES'
const POST_CANDY = 'POST_CANDY';
const DELETE_CANDY = 'DELETE_CANDY';
const PUT_CANDY = 'PUT_CANDY';

const initialState = {
  allCandies: []
};

const candiesAction = candies => ({ type: GET_CANDIES, candies })
const postCandyAction = candy => ({ type: POST_CANDY, candy });
const deleteCandyAction = id => ({ type: DELETE_CANDY, id });
const updateCandyAction = candy => ({ type: PUT_CANDY, candy });

export default function (state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case GET_CANDIES:
      newState.allCandies = action.candies
      return newState
    case POST_CANDY:
      newState.allCandies = [...newState.allCandies, action.candy];
      return newState
    case PUT_CANDY:
      newState.allCandies = newState.allCandies.map(candy => {
        return +candy.id === +action.candy.id ? action.candy : candy
      });
      return newState;
    case DELETE_CANDY:
      newState.allCandies = newState.allCandies.filter(candy => +candy.id !== +action.id);
      return newState
    default:
      return state;
  }
}

export function fetchCandies() {
  return function thunk(dispatch) {
    return axios
      .get('/api/candies')
      .then(res => res.data)
      .then(candies => {
        const action = candiesAction(candies);
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
        const action = updateCandyAction(changedCandy);
        dispatch(action);
        history.push(`/candies/${changedCandy.id}`);
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
        history.push(`/candies/${createCandy.id}`);
      })
      .catch(console.error);
  };
};

export const deleteCandyThunk = id => {
  return dispatch => {
    return axios.delete(`/api/candies/${id}`)
      .then(() => {
        const action = deleteCandyAction(id);
        dispatch(action);
      });
  };
};
