import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putOrderThunk } from '../store/orders.js';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  currentOrderElements(orders) {
    return orders.map((order) => {
      return (
        <div key={order.id}>
          {`Ordered on: ${order.date}\nCurrent Status: ${order.status}\n Price: ${order.price}\nAddress:${order.address}\nThank's very much!!\n`}
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
            type="submit"
            name="add"
            value="x"
        />
        </div>
      )
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = event.target.remove.value;
    const
    const orderObj = {id};
    this.props.putOrder(orderObj, this.props.ownProps.history);
  }

  render() {
    const users = this.props.users;
    const orders = this.props.orders;
    const isMounted = users && orders;
    if (isMounted) {
      let user = this.getUser(users);
      let filteredOrders = this.filterOrders(users, orders);
      let [currentOrders,finishedOrders] = this.findCurrentOrders(filteredOrders);
      let currentOrderElements = this.createCurrentOrders(currentOrders);
      let finishedOrdersElements = this.createFinishedOrders(finishedOrders)
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
    users: state.users
  };
};

const mapDispatchToProps = (dispatch, history) => {
  return {
    putOrder: (order, history) => {
      return dispatch(putOrderThunk(order, history));
    }
  };
};

export default withRouter(connect(_, mapDispatchToProps)(UserPage));
