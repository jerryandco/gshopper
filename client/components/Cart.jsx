import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import _ from 'lodash'
import { fetchCandies, postOrderThunk } from '../store'

export class Cart extends Component {

  constructor() {
    super()
    this.state = {
      cart: JSON.parse(window.localStorage.cart),
      address: ''
    }
    this.handleRemove = this.handleRemove.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
    this.price = this.price.bind(this);
    this.totalPrice = this.totalPrice.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleOrder = this.handleOrder.bind(this)
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

    const cartTotal = candyTotals.reduce((a, b) => a + b)
    return +cartTotal
  }

  price(key, candies) {
    let item = this.state.cart[key];
    let quantity = item.quantity;
    let id = item.id;
    let foundCandy = candies.find(candy => {
      return +candy.id === +id
    });
    if (foundCandy) {
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

  handleAddressChange(event) {
    this.setState({
      address: event.target.value
    })
  }

  handleOrder(price, candies, id, event) {
    event.preventDefault();
    const userId = id || 2;
    const cart = this.state.cart;
    let submitCandy = [];
    for (let key in cart) {
      submitCandy.push(cart[key]);
    }

    submitCandy.map(candy => {
      const find = candies.find(singleCandy => +singleCandy.id === +candy.id);
      candy.price = find.price;
      return candy
    });

    const order = {
      userId,
      address: this.state.address,
      price
    }

    this.props.submitOrder(order, submitCandy)
    window.localStorage.cart = JSON.stringify({});
    this.setState({
      address: ''
    })
  }


  render() {
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
            <div> price: {this.props.candies && (<span>{this.price(key, this.props.candies)}</span>)}
            </div>
          </div>
        ))}
        <div>
          Total Price: {Object.keys(cart).length && this.totalPrice(Object.keys(cart), this.props.candies)}
          <form onSubmit={(event) => {
            let price = this.totalPrice(Object.keys(cart), this.props.candies);
            this.handleOrder(price, this.props.candies, this.props.user.id, event);
          }} >
            <span>Address: <input type="text" name="address" onChange={this.handleAddressChange} /></span>
            <input
              type="submit"
              disabled={!this.props.isLoggedIn || this.state.address.length === 0}
              value="Checkout"
            />
            {!this.props.isLoggedIn && (
              <span>Please signup or login to complete the order</span>
            )}
          </form>
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
    cart: JSON.parse(window.localStorage.cart),
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: (order, candy) => dispatch(postOrderThunk(order, candy)),
    allCandiesFetch: () => dispatch(fetchCandies())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
);
