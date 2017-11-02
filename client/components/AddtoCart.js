import React, { Component } from "react";
//import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { withRouter, NavLink, Link } from "react-router-dom";
import store from "../store"
import { fetchCandies } from "../store/candies.js"

class  extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.allCandiesFetch();
  }

  render() {


    return (
      <div>
       <button onClick={() => }>
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
