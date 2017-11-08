import axios from 'axios';
import history from '../history';

const GET_CATEGORIES = 'GET_CATEGORIES';
const POST_CATEGORY = 'POST_CATEGORY';
const PUT_CATEGORY = 'PUT_CATEGORY';

const initialState = {
  allCategories: []
};

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({ type: GET_CATEGORIES, categories });
const postCategory = category => ({ type: POST_CATEGORY, category });
const putCategoryAction = category => ({ type: PUT_CATEGORY, category });


export default function (state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case GET_CATEGORIES:
      newState.allCategories = action.categories
      return newState
    case POST_CATEGORY:
      newState.allCategories = [...newState.allCategories, action.category];
      return newState
    case PUT_CATEGORY:
      newState.allCategories = newState.allCategories.map(category => {
        return +action.category.id === +category.id ? action.category : category
      })
      return newState;
    default:
      return state
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
  return axios
    .post('/api/categories', category)
    .then(res => {
      dispatch(postCategory(res.data))
      history.push(`/categories/${res.data.id}`);
    })
    .catch(err =>
      console.error(`Creating category: ${category} unsuccessful`, err)
    );
};

export const putCategoryThunk = (category, id) => dispatch => {
  return axios
    .put(`/api/categories/${id}`, category)
    .then(res => {
      dispatch(putCategoryAction(res.data));
      history.push(`/categories/${id}`);
    })
    .catch(err =>
      console.error(`Update category : ${category} unsuccessful`, err)
    );
};
