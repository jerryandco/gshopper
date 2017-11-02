import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import { fetchCandies } from '../store/candies.js';
import { fetchCategories } from '../store/categories.js';
import AddToCart from './AddToCart.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.generateFeaturedList = this.generateFeaturedList.bind(this);
  }

  componentDidMount() {
    this.props.allCandiesFetch();
    this.props.allCategoriesFetch();
  }

  generateFeaturedList = type => {
    const featuredArr = [];
    if (type === 'category') {
      if (this.props.allCategories.length) {
        for (let i = featuredArr.length; i <= 3; i++) {
          let category = this.props.allCategories[
            Math.floor(Math.random() * this.props.allCategories.length)
          ];
          if (featuredArr.indexOf(category) < 0) {
            featuredArr.push(category);
          } else {
            i--;
          }
        }
      }
    }

    if (type === 'candy') {
      if (this.props.allCandies.length) {
        for (let i = featuredArr.length; i <= 5; i++) {
          let candy = this.props.allCandies[
            Math.floor(Math.random() * this.props.allCandies.length)
          ];
          if (featuredArr.indexOf(candy) < 0) {
            featuredArr.push(candy);
          } else {
            i--;
          }
        }
      }
    }
    return featuredArr;
  };

  render() {
    return (
      <div>
        <h1>Featured Categories</h1>
        {this.generateFeaturedList('category').map(featCategory => (
          <div key={featCategory.id}>
            <p>{featCategory.name}</p>
            <img src={featCategory.image} className="featured-image" />
            <p>{featCategory.description}</p>
           
          </div>
        ))}

        <h1>Featured Candy</h1>
        {this.generateFeaturedList('candy').map(featCandy => (
          <div key={featCandy.id}>
            <p>{featCandy.name}</p>
            <img src={featCandy.image} className="featured-image" />
            <p>{featCandy.description}</p>
            <AddToCart item={featCandy} />
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
