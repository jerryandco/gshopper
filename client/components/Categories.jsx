import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import { fetchCategories } from '../store/categories.js';

class Categories extends Component {
  // componentDidMount() {
  //   this.props.allCategoriesFetch();
  // }

  render() {
    console.log('props', this.props);
    return (
      <div>
        <h1>All Categories</h1>
        {this.props.categories.map(category => (
          <div className="all-categories" key={category.id}>
            <NavLink to={`/categories/${category.id}`}>
              <h2>{category.name}</h2>
              <img src={category.image} className="image" />
            </NavLink>
            <h3>{category.description}</h3>
          </div>
        ))}
      </div>
    );
  }
}

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
