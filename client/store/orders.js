import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';
const POST_ORDER = 'POST_ORDER';
const PUT_ORDER = 'PUT_ORDER';

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
});

const postOrder = order => ({
  type: POST_ORDER,
  order
});

const putOrder = order => ({
  type: PUT_ORDER,
  order
});

export const fetchOrders = () => {
  return dispatch => {
    return axios
      .get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders);
        dispatch(action);
      })
      .catch(console.error);
  };
};
export const postOrderThunk = (newOrder, history) => {
  return dispatch => {
    return axios
      .post('/api/orders', newOrder)
      .then(res => {
        return res.data;
      })
      .then(order => {
        const action = postOrder(order);
        dispatch(action);
        //figure out history in future
        // history.push(`/orders/${order.id}`);
      })
      .catch(console.error);
  };
};

export const putOrderThunk = order => {
  return dispatch => {
    return axios
      .put(`/api/orders/${order.id}`, order)
      .then(res => {
        return res.data;
      })
      .then(newOrder => {
        const action = putOrder(newOrder);
        dispatch(action);
      })
      .catch(console.error);
  };
};

const ordersReducer = function(orders = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case POST_ORDER:
      return [action.order, ...orders];
    case PUT_ORDER:
      var otherOrders = orders.filter(order => order.id !== action.order.id);
      return [action.order, ...otherOrders];
    default:
      return orders;
  }
};

export default ordersReducer;