import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import store from '../store';
import { fetchReviews } from '../store/reviews.js'

class Reviews extends Component {
  constructor(){
    super()

    this.starsRender = this.starsRender.bind(this)
    this.averageRating = this.averageRating.bind(this)
  }

  componentDidMount(){
    this.props.allReviewsFetch()
  }

  starsRender(numStars){
    const starsArray = [false, false, false, false, false]
    for (let i = 0; i < numStars; i++){
      starsArray[i] = true
    }
    return starsArray.map(star => star ? '*'  : '')
  }

  averageRating(reviews){
    if (reviews.length){
    const starsFromReviews = reviews.map(review => review.stars)
    const totalStars = starsFromReviews.reduce((a, b) => a + b )
    const averageStars = (totalStars / reviews.length)
    const displayAverageStars = Math.floor(averageStars * 100) / 100
    return `Average Rating: ${displayAverageStars}/5, from ${reviews.length} reviews `
    }
  }

  render(){
    const reviews = this.props.reviews.filter(review => review.candyId === this.props.item.id)

    return (
      <div>
      <div> {this.averageRating(reviews)}</div>
        <div> {reviews.map(review => ( <div key={review.id}>{review.review} {this.starsRender(review.stars)}

          <div>  {`- ${review.user.firstName}  ${review.user.lastName[0]}`}. </div>
          </div>
        ))}</div>
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
