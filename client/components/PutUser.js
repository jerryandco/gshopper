import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putUserThunk } from '../store/users.js';

//way to force user to reset password??
class PutUser extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this;
    // let id = +this.props.match.params.id,
    const firstName = event.target.firstname.value,
      lastName = +event.target.lastname.value,
      email = event.target.email.value,
      isAdmin = event.target.isadmin.value,
      //here it should be userObj = { id }
      userObj = {};

    if (firstName.length !== 0) {
      userObj.firstName = firstName;
    }
    if (lastName.length !== 0) {
      userObj.lastName = lastName.length;
    }
    if (email.length !== 0) {
      userObj.email = email;
    }
    if (isAdmin === 'true') {
      userObj.isAdmin = 'TRUE';
    }
    console.log(userObj);
    // this.props.putUser(userObj, this.props.ownProps.history);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstname" autoFocus />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastname" />
          </label>
          <label>
            Email:
            <input type="text" name="email" />
          </label>
          <input type="submit" value="Submit" />
          <div>Administrator?</div>
          <select name="isadmin">
            <option value="false" selected>
              False
            </option>
            <option value="true">True</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUser: (product, history) => {
    return dispatch(putUserThunk(product, history));
  },
  ownProps
});

export default withRouter(connect(_, mapDispatchToProps)(PutUser));
