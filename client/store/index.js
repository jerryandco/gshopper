import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import candies from './candies';
import categories from './categories';
import users from './users';
import orders from './orders';
import reviews from './reviews'

const reducer = combineReducers({ user, users, orders, candies, categories, reviews });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './candies';
export * from './categories';
export * from './users';
export * from './orders';
export * from './reviews'
