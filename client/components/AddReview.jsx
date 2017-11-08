import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import {postReviews} from '../store/reviews'

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit (event) {
    event.preventDefault();
    const review = event.target.review.value
    const stars = event.target.stars.value
    const userId = this.props.user.id
    const candyId = this.props.item.id
    const submitReview = {
      userId,
      candyId,
      review,
      stars
    }
    console.log(submitReview);
    this.props.postReview(submitReview)
  }
  render() {

    return (  this.props.isLoggedIn &&
      <div className="row" >
        <p className="col s3">We appreciate your feedback: </p>

        <form className="col s9" onSubmit={this.handleSubmit}>

        <select className=' col s1 browser-default' name='stars'>
        <option value='1'>1 star</option>
        <option value='2'>2 stars</option>
        <option value='3'>3 stars</option>
        <option value='4'>4 stars</option>
        <option value='5'>5 stars </option>
        </select>

        <textarea className="col s8" name='review'/>
        <button className="waves-effect waves-dark btn col s1" type='submit'><i className="material-icons">add</i></button>
        </form>
      </div>
    )
  }
}

/**
   * CONTAINER
   */
  const mapStateToProps = state => {
    return {
      isLoggedIn: !!state.user.id,
      user: state.user
    }
  };

const mapDispatchToProps = dispatch => {
  return {
    postReview: (review) => dispatch(postReviews(review))
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddReview)
);
