import axios from 'axios';
import history from '../history';

const GET_CANDIES = 'GET_CANDIES';
const POST_CANDY = 'POST_CANDY';
const PUT_CANDY = 'PUT_CANDY';
const DELETE_CANDY = 'DELETE_CANDY';
/**
 * INITIAL STATE
 */

const initialState = {
  allCandies: []
};

/**
 * ACTION CREATORS
 */
const getCandies = candies => ({ type: GET_CANDIES, candies });
const postCandy = candy => ({ type: POST_CANDY, candy });
const putCandy = candy => ({ type: PUT_CANDY, candy });
const deleteCandy = candy => ({ type: DELETE_CANDY, candy });

export default function(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_CANDIES:
      newState.allCandies = action.candies;
      return newState;
    default:
      return newState;
  }
}

//THUNK CREATOR

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

export function fetchSingleCandy(candyId) {
  return function thunk(dispatch) {
    return axios
      .get(`/api/candies/${candyId}`)
      .then(res => res.data)
      .then(candy => {
        const action = singleCandyAction(candy);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
}
