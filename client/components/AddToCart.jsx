import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import _ from 'lodash'

export default class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit (evt) {
    evt.preventDefault();
    const name = this.props.item.name
    const id = this.props.item.id
    const cart = JSON.parse(window.localStorage.cart);
    if (cart[name]){
      cart[name].quantity++
    } else {
      cart[name] = {
        name: name,
        id: id,
        quantity: 1
      }
    }
    window.localStorage.cart = JSON.stringify(cart);

  }
  render() {

    return (
      <button className="btn waves-effect waves-light right" type="submit" name="action" onClick={this.handleSubmit}> <i class="large material-icons">add_shopping_cart </i></button>
    )
  }
}

