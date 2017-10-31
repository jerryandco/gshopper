import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CANDIES = 'GET_CANDIES'

/**
 * INITIAL STATE
 */


/**
 * ACTION CREATORS
 */
const getCandies = candies => ({type: GET_CANDIES, candies})

export default function (state = [], action) {
    switch (action.type) {
      case GET_CANDIES:
        return action.candies
      default:
        return state
    }
  }

  //THUNK CREATOR
  
  export function fetchCandies(){
    return function thunk(dispatch){
      return axios
      .get("/api/candies")
      .then(res => res.data)
      .then(candies => {
        const action = getCandies(candies);
        dispatch(action);
      })
      .catch(err => console.error(err))
    }
  }