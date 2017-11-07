import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { fetchCategories } from '../store/categories.js';
import { fetchCandies } from '../store/candies.js';
import AddToCart from './AddToCart.jsx'
import './SingleCategory.scss'

class SingleCategory extends Component {

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
          <h1>Category: {singleCategory.name}</h1>
          <div className="all-candies" key="1">
            <img src={singleCategory.image} className="single-category-image" />
            <h3>{singleCategory.description}</h3>
            <div>
              {candiesFromCategory.map(candy => (
                <div className="row" key={candy.id}>
                <div className="col s12 m5">
                  <div className="card large">
                    <div classNane="card-image">
                      <img src={candy.image} className="image" />
                      <span className="card-title"> {candy.name} </span>
                    </div>
                     <div className="card-content">
                      <p>{candy.description}</p>
                     </div>
                    <div className="card-action">
                      <NavLink to={`/candies/${candy.id}`}>
                      View Candy
                      </NavLink>
                      <AddToCart item={candy} />
                    </div>
                  </div>
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
  connect(mapStateToProps, mapDispatchToProps)(SingleCategory)
);
