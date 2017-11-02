import React, { Component } from "react";
//import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { withRouter, NavLink, Link } from "react-router-dom";
import store from "../store"
import { fetchCandies } from "../store/candies.js"
import AddToCart from "./AddToCart.jsx";
class Candies extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.allCandiesFetch();
  }

  render() {


    return (
      <div>
        <h1>All Candy</h1>
        {this.props.allCandies.map(candy => (
          <div className="all-candies" key={candy.id}>
            <NavLink to={`/candies/${candy.id}`}>
              <h2>{candy.name}</h2>
              <img src={candy.image} className="image" />
              <h3>{candy.description}</h3>
              <h3>Stock: {candy.quantity}</h3>
              </NavLink>
              <AddToCart item={candy} />
          </div>
        ))}
      </div>
    );
  }
}

/**
   * CONTAINER
   */
const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    allCandies: state.candies.allCandies //candies is the reducer in Combine Reducers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allCandiesFetch: () => dispatch(fetchCandies())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Candies));
