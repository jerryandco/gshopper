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
    this.state = {
      cart: JSON.parse(window.localStorage.cart)
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.allCandiesFetch();

  }

  handleClick(event) {
    const cart = JSON.parse(window.localStorage.cart)

    delete cart[event.target.value]
    window.localStorage.cart = JSON.stringify(cart)
    this.setState({
      cart: cart
    })
  }

  render() {

    const cart = JSON.parse(window.localStorage.cart)
    return (
      <div>
        This is the cart
        { Object.keys(cart).map(key => (
          <div key={key}>
            Name: {key}
            Quantity: {cart[key].quantity}
            <button value={key}onClick={this.handleClick}> Remove </button>
          </div>
          ))}
      </div>
      );
    }
}

/**
   * CONTAINER
   */


const mapDispatchToProps = dispatch => {
  return {
    allCandiesFetch: () => dispatch(fetchCandies())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(null, mapDispatchToProps)(Cart)
);
