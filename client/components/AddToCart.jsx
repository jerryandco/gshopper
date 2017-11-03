import React, { Component } from "react";
//import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { withRouter, NavLink, Link } from "react-router-dom";

export default class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit (evt) {
    evt.preventDefault();
    let cart = JSON.parse(window.localStorage.cart);
    cart.push(this.props.item);
    window.localStorage.cart = JSON.stringify(cart);
  }
  render() {

    return (
      <button onClick={this.handleSubmit}> Add to cart </button>
    )
  }
}


