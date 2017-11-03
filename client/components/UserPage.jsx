import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putOrderThunk } from '../store/orders.js';
// import { postReviewThunk } from '../store/reviews.js'
// import { getOrderCandies } from '../store/orderCandies.js'

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findParticularOrders = this.findParticularOrders.bind(this);
    this.getUser = this.getUser.bind(this);
    this.filterOrders = this.filterOrders.bind(this);
    this.currentOrderElements = this.currentOrderElements.bind(this);
    this.finishedOrderElements = this.finishedOrderElements.bind(this);
    this.orderCandies = this.orderCandies.bind(this);
  }

  orderCandies (order) {

  }

  findParticularOrders(orders) {
    const currentOrders = orders.filter((order)=> {
      return order.status==="Created"||order.status==="Processing"
    });
    const finishedOrders = orders.filter((order)=> {
      return order.status!=="Created"||order.status!=="Processing"
    });
    return [currentOrders, finishedOrders];
  }

  getUser(users) {
    const id = +this.props.match.params.id;
    return users.filter(user => user.id === id);
  }

  filterOrders(orders) {
    const userId = +this.props.match.params.id;
    return orders.filter(order => order.userId === userId);
  }

  currentOrderElements(orders, candies) {
    // const orderCandies = candies.filter((candy) => {
    //   return candy.id ===
    // })
    //we need an orderCandies redux store to obtain this information.
    return orders.map((order) => {
      return (
        <div key={order.id}>
          {`Ordered on: ${order.date}\nCurrent Status: ${order.status}\n Price: ${order.price}\nAddress:${order.address}\nThank's very much!!\n`Candies: }
          Cancel Order?
          <input
            onClick={this.handleSubmit}
            id={order.id}
            type="submit"
            name="remove"
            value="x"
        />
        </div>
      )
    })
  }

  finishedOrderElements(orders) {
    return orders.map((order) => {
      return (
        <div key={order.id}>
          {`Ordered on: ${order.date}\nCurrent Status: ${order.status}\n Price: ${order.price}\nAddress:${order.address}\nThank's very much!!\n`}
          Review Order?
          <input
            onClick={this.handleSubmit}
            id={order.id}
            type="text"
            name="add"
        />
        </div>
      )
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const removeId = event.target.remove.value;
    const addId = event.target.add.value;
    if(removeId) {
      const orderObj = {id};
      this.props.putOrder(orderObj, this.props.ownProps.history);
    }
    if(addId) {
      const reviewObj = {}
    }
  }

  render() {
    const users = this.props.users;
    const orders = this.props.orders;
    const candies = this.props.candies;
    const isMounted = users && orders && candies;
    if (isMounted) {
      let user = this.getUser(users);
      let filteredOrders = this.filterOrders(users, orders);
      let [currentOrders,finishedOrders] = this.findCurrentOrders(filteredOrders);
      let currentOrderElements = this.createCurrentOrders(currentOrders, candies);
      let finishedOrdersElements = this.createFinishedOrders(finishedOrders, candies);
    }
    return (
      <div>
        {isMounted &&
          Hello {user.name}!!!!!

        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    users: state.users,
    candies: state.candies
  };
};

const mapDispatchToProps = (dispatch, history) => {
  return {
    putOrder: (order, history) => {
      return dispatch(putOrderThunk(order, history));
    },
    putReview: (review) => {
      return dispatch(postReviewThunk(review))
    },
    fetchOrderCandies: (orderId) => {
      return dispatch(fetchOrderCandiesThunk(orderId))
    }
  };
};

export default withRouter(connect(_, mapDispatchToProps)(UserPage));
