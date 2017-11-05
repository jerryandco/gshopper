import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import _ from 'lodash'
import { fetchCandies } from '../store'

class Cart extends Component {

  constructor() {
    super()
    this.state = {
      cart: JSON.parse(window.localStorage.cart)
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.price = this.price.bind(this);
    this.totalPrice = this.totalPrice.bind(this)
  }

  componentDidMount() {
    this.props.allCandiesFetch();

  }

  handleRemove(event) {
    const cart = JSON.parse(window.localStorage.cart)

    delete cart[event.target.value]
    window.localStorage.cart = JSON.stringify(cart)
    this.setState({

      cart: cart
    })
  }

  handleDecrement(event) {
    const cart = JSON.parse(window.localStorage.cart)
    cart[event.target.value].quantity--
    window.localStorage.cart = JSON.stringify(cart)
    this.setState({

      cart: cart
    })
  }

  totalPrice(candiesInCart, allCandies) {
    const candyTotals = candiesInCart.map(candy => this.price(candy, allCandies))

    const cartTotal = candyTotals.reduce((a, b) =>  a + b)
    return +cartTotal
  }

  price(key, candies) {
    let item = this.state.cart[key];
    let quantity = item.quantity;
    let id = item.id;
    let foundCandy = candies.find(candy=>{
        return +candy.id === +id
    });
    // console.log('check here',foundCandy);
    if (foundCandy){
      return +quantity * +foundCandy.price
    }
  }

  handleIncrement(event) {
    const cart = JSON.parse(window.localStorage.cart)
    cart[event.target.value].quantity++
    window.localStorage.cart = JSON.stringify(cart)
    this.setState({

      cart: cart
    })
  }

  render() {
    console.log('props', this.props.candies)
    const cart = JSON.parse(window.localStorage.cart)
    return (
      this.props.candies &&
      <div>
        This is the cart
        {Object.keys(cart).map(key => (
          <div key={key}>
            Name: {key}
            {(cart[key].quantity > 1) ?
              <button value={key} onClick={this.handleDecrement}> - </button> :
              <button value={key} disabled> - </button>
            }
            Quantity: {cart[key].quantity}
            <button value={key} onClick={this.handleIncrement}  > + </button>
            <button value={key} onClick={this.handleRemove}> Remove </button>
            <br />
            <div> price: {this.props.candies && (<span>{this.price(key,this.props.candies)}</span>)}
            </div>
            </div>
          ))}
          <div>
          Total Price: {this.totalPrice(Object.keys(cart), this.props.candies)}
          </div>
      </div>
    );
  }
}

/**
   * CONTAINER
   */
const mapStateToProps = state => {
  return {
    candies: state.candies.allCandies,
    cart: JSON.parse(window.localStorage.cart)
  }
}

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
