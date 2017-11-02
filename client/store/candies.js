import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CANDIES = 'GET_CANDIES'

/**
 * INITIAL STATE
 */

 const initialState = {
   allCandies: []
 }


/**
 * ACTION CREATORS
 */
const candiesAction = candies => ({type: GET_CANDIES, candies})

export default function (state = initialState, action) {
  const newState = Object.assign({}, state)
    switch (action.type) {
      case GET_CANDIES:
      newState.allCandies = action.candies
      return newState
      default:
        return newState
    }
  }

  //THUNK CREATOR
  
  export function fetchCandies(){
    return function thunk(dispatch){
      return axios
      .get("/api/candies")
      .then(res => res.data)
      .then(candies => {
        const action = candiesAction(candies);
        dispatch(action);
      })
      .catch(err => console.error(err))
    }
  }

