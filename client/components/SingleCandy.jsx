import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import { fetchCandies } from '../store/candies.js';
import AddToCart from './AddToCart.jsx';
import Reviews from './Reviews.jsx'
import AddReview from './AddReview.jsx'

class Candies extends Component {
  componentDidMount() {
    this.props.allCandiesFetch();
  }

  render() {
    const candyId = this.props.match.params.id;
    if (this.props.allCandies.length) {
      const singleCandy = this.props.allCandies.find(
        candy => candy.id === +candyId
      );
      return (

        <div className='container'>
          <h1>{singleCandy.name}</h1>
          <div className="row all-candies" key="1">
            <img src={singleCandy.image} className="singleCandy-image" />
            <h3 className='col s6'>{singleCandy.description}</h3>
            <h3 className='col s2'>Stock: {singleCandy.quantity}</h3>
            <AddToCart className='col s2'item={singleCandy} />
          </div>
            <div> -------- </div>
            <AddReview  item={singleCandy} />
            <Reviews item = {singleCandy} />
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
      allCandies: state.candies.allCandies
    };
  };

const mapDispatchToProps = dispatch => {
  return {
    allCandiesFetch: () => dispatch(fetchCandies())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Candies)
);
