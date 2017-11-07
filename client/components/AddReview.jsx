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
      <div> We appreciate your feedback:
      <form onSubmit={this.handleSubmit}>
      <label>
       Stars :
      <select name='stars'>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
      <option value='4'>4</option>
      <option value='5'>5</option>
      </select>
      </label>
      <textarea name='review'/>
      <button className="waves-effect waves-dark btn" type='submit'><i className="material-icons">add</i></button>
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
