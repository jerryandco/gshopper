import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import Filter from './Filter.jsx';
import { fetchCategories } from '../store/categories.js';

const Categories = props => {
  return (
    <div>
      {props.categories.length && (
        <div>
          <h1>All Categories</h1>
          <Filter type={'category'} />
        </div>
      )}
    </div>
  );
};

/**
   * CONTAINER
   */
const mapStateToProps = state => {
  return {
    categories: state.categories.allCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allCategoriesFetch: () => dispatch(fetchCategories())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Categories)
);
