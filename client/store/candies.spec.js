//IN PROGRESS



// import { expect } from 'chai';
// import {
//   postCandy,
//   deleteCandy,
//   putCandy,
//   fetchCandies,
//   fetchSingleCandy
// } from './user';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import configureMockStore from 'redux-mock-store';
// import thunkMiddleware from 'redux-thunk';
// import history from '../history';
// const middlewares = [thunkMiddleware];
// const mockStore = configureMockStore(middlewares);

// describe('thunk creators', () => {
//   let store;
//   let mockAxios;

//   let initialState = {
//     allCandies: [
//       {
//         name: 'Magic stuff',
//         price: 10.5,
//         quantity: 409
//       },
//       {
//         name: 'Magic other stuff',
//         price: 0.5,
//         quantity: 4049
//       },
//       {
//         name: 'Coconut Crabs',
//         price: 4.5,
//         quantity: 9
//       },
//       {
//         name: 'Crocodile candy',
//         price: 1,
//         quantity: 9
//       }
//     ]
//   };

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios);
//     store = mockStore(initialState);
//   });

//   afterEach(() => {
//     mockAxios.restore();
//     store.clearActions();
//   });

//   describe('me', () => {
//     it('eventually dispatches the GET ALL CANDY action', () => {
//       mockAxios.onGet('/api/candies').replyOnce(200, candies);
//       return store.dispatch(getCandies(candies)).then(() => {
//         const actions = store.getActions();
//         expect(actions[0].type).to.be.equal('GET_CANDIES');
//         expect(actions[0].candies[1].name).to.be.deep.equal(
//           'Magic other stuff'
//         );
//       });
//     });
//   });

//   describe('post', () => {
//     let newCandy = {
//       name: 'Magic expensive stuff',
//       price: 1124322.5,
//       quantity: 1
//     }

//     it('logout: eventually dispatches the POST_CANDY action', () => {
//       mockAxios.onPost('/api/candies').replyOnce(201, newCandy);
//       return store.dispatch(postCandy(newCandy)).then(() => {
//         const actions = store.getActions();
//         expect(actions[0].type).to.be.equal('POST_CANDY');
//         expect(actions[0].candy.name).to.be.equal('Magic expensive stuff');
//       });
//     });
//   });

//   //there are no functions for put or for delete in mock axios adapter so I am stopping here, perhaps, we would need to find new libraries to implement such tests.
// });
