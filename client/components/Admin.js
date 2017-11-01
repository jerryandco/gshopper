import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AddProduct from "./AddProduct.js";
import AddCategory from "./AddCategory.js";

export const createOptions = (table, name) => {
  const options = table.map(row => {
    return (
      <option key={row.id} value={row.id}>
        {row.name}
      </option>
    );
  });
  return (
    <select name={name} multiple>
      {options}
    </select>
  );
};
//admin route should be something not accessible solely by hardcoding into the url, should return something like "must be an admin to access this page"
class Admin extends Component {
  constructor(props) {
    super(props);
    this.createElements = this.createElements.bind(this);
  }

  createElements(table, name) {
    return table.map(row => {
      return (
        <NavLink key={row.id} to={`/${name}edit/${row.id}`}>
          <button id={row.id} />
        </NavLink>
      );
    });
  }

  render() {
    const allCandy = this.props.candies;
    const allUsers = this.props.users;
    const allOrders = this.props.users;
    const allReviews = this.props.reviews;

    if (allCandy && allUsers && allOrders && allReviews) {
      let candies = this.createElements(allCandy, "candies"),
        users = this.createElements(allUsers, "users"),
        orders = this.createElements(allOrders, "orders"),
        reviews = this.createElements(allReviews, "reviews");
    }
    return (
      <div>
        <AddProduct />
        <AddCategory />
        {isMounted && candies}
        {isMounted && users}
        {isMounted && orders}
        {isMounted && reviews}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  candies: state.candies,
  users: state.users,
  reviews: state.reviews,
  orders: state.orders
});

export default withRouter(connect(mapStateToProps)(Admin));
