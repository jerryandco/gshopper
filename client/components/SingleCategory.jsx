import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import { fetchCategories } from '../store/categories.js';
import { fetchCandies } from '../store/candies.js';
import AddToCart from './AddToCart.jsx'

class Category extends Component {
  componentDidMount() {
    this.props.allCategoriesFetch();
    this.props.allCandiesFetch();
  }

  render() {
    const categoryId = this.props.match.params.id;
    if (this.props.allCategories.length && this.props.allCandies.length) {
      const singleCategory = this.props.allCategories.find(
        category => category.id === +categoryId
      );
      const candiesFromCategory = this.props.allCandies.filter(candy => {
        for (let i = 0; i < candy.categories.length; i++) {
          if (candy.categories[i].id === singleCategory.id) {
            return true;
          }
        }
      });
      return (
        <div>
          <h1>{singleCategory.name}</h1>
          <div className="all-candies" key="1">
            <img src={singleCategory.image} className="single-image" />
            <h3>{singleCategory.description}</h3>
            <div>
              {candiesFromCategory.map(candy => (
                <div>
                  <h1>{candy.name}</h1>
                  <div className="all-candies" key="1">
                    <img src={candy.image} className="single-image" />
                    <h3>{candy.description}</h3>
                    <h3>Stock: {candy.quantity}</h3>
                    <AddToCart item={candy} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <div> loading </div>;
    }
  }
}

/**
   * CONTAINER
   */
const mapStateToProps = state => {
  return {
    allCategories: state.categories.allCategories,
    allCandies: state.candies.allCandies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allCategoriesFetch: () => dispatch(fetchCategories()),
    allCandiesFetch: () => dispatch(fetchCandies())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
