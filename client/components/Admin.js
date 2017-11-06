import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddProduct from './AddProduct.js';
import AddCategory from './AddCategory.js';

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
    // if(name === 'orders')
    this;
    const elements = table.map(row => {
      return (
        <div key={row.id}>
          <div>
            {row.address ||row.name || row.firstName + ' ' + row.lastName}
            <NavLink key={row.id} id={row.id} to={`/${name}edit/${row.id}`}>
              <button id={row.id}>Go</button>
            </NavLink>
          </div>
        </div>
      );
    });
    elements[elements.length] = <div><br /></div>;
    return elements;
  }

  render() {
    const allCandy = this.props.candies.allCandies;
    const allUsers = this.props.users;
    const allOrders = this.props.orders;
    // const allReviews = this.props.reviews;
    const isMounted = allCandy.length > 0;
    if (isMounted) {
      var candies = this.createElements(allCandy, 'candies'),
        users = this.createElements(allUsers, 'users'),
        orders = this.createElements(allOrders, 'orders');
      // reviews = this.createElements(allReviews, 'reviews');
    }
    return (
      <div>
        <AddProduct />
        <AddCategory />
        {isMounted && candies}
          <br />
        {isMounted && users}
          <br />
        {isMounted && orders}
          <br />
        {/*isMounted && reviews*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candies: state.candies,
    users: state.users,
    reviews: state.reviews,
    orders: state.orders
  };
};

export default withRouter(connect(mapStateToProps)(Admin));
