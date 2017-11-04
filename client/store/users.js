import axios from 'axios';
import { getUser } from './user';
import history from '../history';
//we may need this above function in the future to connect with the session

/* -----------------    ACTION TYPES ------------------ */

const GET_USERS = 'GET_USERS';
const CREATE_USER= 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER= 'UPDATE_USER';


/* ------------   ACTION CREATORS     ------------------ */

const getUsersAction  = users => ({ type: GET_USERS, users });
const createUserAction = user  => ({ type: CREATE_USER, user });
const deleteUserAction = id    => ({ type: DELETE_USER, id });
const updateUserAction = user  => ({ type: UPDATE_USER, user });



/* ------------       REDUCER     ------------------ */

export default function (users = [], action) {
  switch (action.type) {

    case GET_USERS:
      return action.users;

    case CREATE_USER:
      return [action.user, ...users];

    case DELETE_USER:
      return users.filter(user => user.id !== action.id);

    case UPDATE_USER:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ));
    default:
      return users;
  }
}


/* ------------   THUNK CREATORS     ------------------ */

export const fetchUsersThunk = () => dispatch => {
  axios.get('/api/users')
       .then(res => dispatch(getUsersAction(res.data)));
};

// optimistic
export const deleteUserThunk = id => dispatch => {
  dispatch(deleteUserAction(id));
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

export const createUserThunk = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => {
          dispatch(createUserAction(res.data));
        })
       .catch(err => console.error(err));
};

export const putUserThunk = (user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
       .then(res => {
         dispatch(updateUserAction(res.data));
       })
       .catch(err => console.error(`Updating user: ${user} unsuccesful`, err));
};
