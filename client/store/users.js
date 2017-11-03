import axios from 'axios';
import { getUser } from './user';
//we may need this above function in the future to connect with the session

/* -----------------    ACTION TYPES ------------------ */

const GET_USERS = 'GET_USERS';
const CREATE_USER= 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const PUT_USER= 'UPDATE_USER';


/* ------------   ACTION CREATORS     ------------------ */

const getUsers  = users => ({ type: INITIALIZE, users });
const createUser = user  => ({ type: CREATE, user });
const deleteUser = id    => ({ type: DELETE, id });
const updateUser = user  => ({ type: UPDATE, user });



/* ------------       REDUCER     ------------------ */

export default function reducer (users = [], action) {
  switch (action.type) {

    case GET_USERS:
      return action.users;

    case CREATE:
      return [action.user, ...users];

    case DELETE:
      return users.filter(user => user.id !== action.id);

    case UPDATE:
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
       .then(res => dispatch(getUsers(res.data)));
};

// optimistic
export const deleteUserThunk = id => dispatch => {
  dispatch(deleteUser(id));
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

export const createUserThunk = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => {
          dispatch(createUser(res.data));
        })
       .catch(err => console.error(err));
};

export const putUserThunk = (user, history) => dispatch => {
  axios.put(`/api/users/${id}`, user)
       .then(res => dispatch(putUser(res.data)))
       .catch(err => console.error(`Updating user: ${user} unsuccesful`, err));
};
