import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AddProduct from "./AddProduct.js";
import AddCategory from "./AddCategory.js";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.createUsers = this.createUsers.bind(this);
    this.createCandies = this.createCandies.bind(this);
  }

  createUsers() {
    let users = this.props.users;
    let userElements = users.map(user => {
      return (
        <NavLink key={user.id} to={`/useredit/${user.id}`}>
          <button id={user.id} />
        </NavLink>
      );
    });
    return userElements;
  }

  createCandies() {
    let candies = this.props.candies;
    let candyElements = candies.map(user => {
      return (
        <NavLink key={candy.id} to={`/candyedit/${candy.id}`}>
          <button id={candy.id} />
        </NavLink>
      );
    });
    return candyElements;
  }
  render() {
    const isMounted = this.props.candies;
    if(isMounted) {
      const candies = this.createCandies();
      const users = this.createUsers();
    }
    return (
      <div>
        <AddProduct />
        <AddCategory />
        {isMounted && candies}
        {isMounted && users}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candies: state.candies,
  users: state.users
});

export default withRouter(connect(mapStateToProps)(Admin));
