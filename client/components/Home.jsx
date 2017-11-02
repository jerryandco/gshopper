import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import { fetchCandies } from '../store/candies.js';
import { fetchCategories } from '../store/categories.js';

class Home extends Component {
  componentDidMount() {
    this.props.allCandiesFetch();
    this.props.allCategoriesFetch();
  }

  render() {
    return (
      <div>
        <h1>Featured Categories</h1>
        <h1>Featured Candy</h1>
      </div>
    );
  }
}

/**
   * CONTAINER
   */
const mapStateToProps = state => {
  return {
    allCandies: state.candies.allCandies, //candies is the reducer in Combine Reducers
    allCategories: state.categories.allCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allCandiesFetch: () => dispatch(fetchCandies()),
    allCategoriesFetch: () => dispatch(fetchCategories())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
