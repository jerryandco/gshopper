import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';

/**
 * INITIAL STATE
 */

const initialState = {
  allCategories: []
};

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories });

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_CATEGORIES:
      newState.allCategories = action.categories;
      return newState;
    default:
      return state;
  }
}

//THUNK CREATOR

export function fetchCategories() {
  return function thunk(dispatch) {
    return axios
      .get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        const action = getCategories(categories);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
}
