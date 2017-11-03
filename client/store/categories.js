import axios from 'axios';
import history from '../history';
<<<<<<< HEAD
//will we reroute?

const GET_CATEGORIES = 'GET_CATEGORIES';
const POST_CATEGORY = 'POST_CATEGORY';
=======

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
>>>>>>> d7cde2fec5d4ff25e1e0d8c4437bd679643cdb5e

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories });
<<<<<<< HEAD
const postCategory = category => ({ type: POST_CATEGORY, category });

export default function(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case POST_CATEGORY:
      return [action.category, ...categories];
    default:
      return categories;
=======

export default function(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case GET_CATEGORIES:
      newState.allCategories = action.categories;
      return newState;
    default:
      return state;
>>>>>>> d7cde2fec5d4ff25e1e0d8c4437bd679643cdb5e
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
<<<<<<< HEAD

export const postCategoryThunk = category => dispatch => {
  axios
    .post('/api/categories', category)
    .then(res => dispatch(postCategory(res.data)))
    .catch(err =>
      console.error(`Creating category: ${category} unsuccessful`, err)
    );
};
=======
>>>>>>> d7cde2fec5d4ff25e1e0d8c4437bd679643cdb5e
