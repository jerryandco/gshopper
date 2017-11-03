import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import _ from 'lodash'
import { fetchCandies } from "../store/candies.js"
// import { fetchCandies } from '../store/candies.js';

class Cart extends Component {

  constructor() {
    super()
    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.allCandiesFetch();

  }

  // handleClick(event) {
  //   console.log(event.target.value)

  // }

  render() {
    const cart = JSON.parse(window.localStorage.cart)
    console.log(cart)
    return (
      <div>
        This is the cart
        { Object.keys(cart).map(key => (
          <div key={key}>
            Name: {key}
            Quantity: {cart[key].quantity}
          </div>
          ))}
      </div>
      );
    }
}

/**
   * CONTAINER
   */
const mapStateToProps = state => {
  return {
    allCandies: state.candies.allCandies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allCandiesFetch: () => dispatch(fetchCandies())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
);
