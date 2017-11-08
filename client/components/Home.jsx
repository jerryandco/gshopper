import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { fetchCandies } from '../store/candies.js';
import { fetchCategories } from '../store/categories.js';
import AddToCart from './AddToCart.jsx';
import Slider from 'react-slick';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.generateFeaturedList = this.generateFeaturedList.bind(this);
  }

  // componentDidMount() {
  //   this.props.allCandiesFetch();
  //   this.props.allCategoriesFetch();
  // }

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
    const sliderSettings = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 400,
      speed: 1000,
      slidesToShow: 2,
      slidesToScroll: 1,
      pauseOnHover: true,
      centerMode: true,
      nextArrow: <div />,
      prevArrow: <div />
    };

    return (
      <div className="container">
        <h1>Featured Categories</h1>

        <div className="slider-category">
          <Slider {...sliderSettings}>
            {this.generateFeaturedList('category').map(featCategory => (
              <div className="feature categories" key={featCategory.id}>
                <NavLink to={`/categories/${featCategory.id}`}>
                  <p>{featCategory.name}</p>
                  <img src={featCategory.image} className="featured-image" />
                </NavLink>
                <p>{featCategory.description}</p>
              </div>
            ))}
          </Slider>
        </div>

        <h1>Featured Candy</h1>
        <div className="slider-candy row">
          {this.generateFeaturedList('candy').map(featCandy => (
            <div className="col s4">
              <div key={featCandy.id}>
                <NavLink to={`/candies/${featCandy.id}`}>
                  <p>{featCandy.name}</p>
                  <div className="img-container">
                    <img src={featCandy.image} className="featured-image" />
                  </div>
                  <p>{featCandy.description}</p>
                </NavLink>
                <AddToCart item={featCandy} />
              </div>
            </div>
          ))}
        </div>
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
