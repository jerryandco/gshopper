import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { putUserThunk } from "../store/products.js";

//way to force user to reset password??
class PutUser extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let id = +this.props.match.params.id,
      firstName = event.target.firstname.value,
      lastName = +event.target.lastname.value,
      email = event.target.email.value,
      isAdmin = event.target.isadmin.value,
      userObj = { id };

    if (firstName.length !== 0) {
      userObj.firstName = firstName;
    }
    if (lastName.length !== 0) {
      userObj.lastName.length = lastName.length;
    }
    if (email.length !== 0) {
      userObj.email = email;
    }
    if (isAdmin === "true") {
      userObj.isAdmin = "TRUE";
    }
    this.props.putUser(userObj, this.props.ownProps.history);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" autoFocus />
          </label>
          <label>
            Description:
            <input type="text" name="name" />
          </label>
          <label>
            Price:
            <input type="number" name="price" value="0" />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value="-1" />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
          <input type="submit" value="Submit" />
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
