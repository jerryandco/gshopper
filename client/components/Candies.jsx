import React, { Component } from "react";
//import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { withRouter, NavLink, Link } from "react-router-dom";
import store from "../store"
import { fetchCandies } from "../store/candies.js"
// import AddToCart from "./AddToCart.jsx";
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
<<<<<<< HEAD
            {/* <AddToCart item={candy} /> */}
            <NavLink to={`/candies/${candy.id}`}>
              <h2>{candy.name}</h2>
=======
          <NavLink to={`/candies/${candy.id}`}>
          <h2>{candy.name}</h2>
>>>>>>> 088e5f9c081e2563f80a6d70e38a4bcddcf959dd
              <img src={candy.image} className="candy-image" />
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
