import axios from 'axios';
import history from '../history';
//will we reroute?

const GET_CATEGORIES = 'GET_CATEGORIES';
const POST_CATEGORY = 'POST_CATEGORY';

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories });
const postCategory = category => ({ type: POST_CATEGORY, category });

export default function(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case POST_CATEGORY:
      return [action.category, ...categories];
    default:
      return categories;
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

export const postCategoryThunk = category => dispatch => {
  axios
    .post('/api/categories', category)
    .then(res => dispatch(postCategory(res.data)))
    .catch(err =>
      console.error(`Creating category: ${category} unsuccessful`, err)
    );
};
