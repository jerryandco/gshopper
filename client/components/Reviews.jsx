import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import { fetchReviews } from '../store/reviews.js'

class Reviews extends Component {

  componentDidMount(){
    this.props.allReviewsFetch()
  }

  render(){
    const reviews = this.props.reviews.filter(review => review.candyId === this.props.item.id)
    return (
      <div>
        <div> {reviews.map(review => ( <div key={review.id}>{review.review}  |  {review.stars}/5 stars </div>))}</div>
        <br />
      </div>
    )
  }

}


/**
   * CONTAINER
   */
  const mapStateToProps = state => {
    return {
      allCandies: state.candies.allCandies,
      reviews: state.reviews
    };
  };

const mapDispatchToProps = dispatch => {
  return {
    allReviewsFetch: () => dispatch(fetchReviews())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Reviews)
);
