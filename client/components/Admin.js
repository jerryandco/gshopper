import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

function createElements(table, name) {
  // if(name === 'orders')
  const elements = table.map(row => {
    return (
      <div key={row.id}>
        <div>
          {row.address || row.name || row.firstName + ' ' + row.lastName}
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


//admin route should be something not accessible solely by hardcoding into the url, should return something like "must be an admin to access this page"
const Admin = (props) => {
  // const allCandy = this.props.candies.allCandies;
  // const allUsers = this.props.users;
  // const allOrders = this.props.orders;
  // // const allReviews = this.props.reviews;
  // const isMounted = allCandy.length > 0;
  // if (isMounted) {
  //   var candies = createElements(allCandy, 'candies'),
  //     users = createElements(allUsers, 'users'),
  //     orders = createElements(allOrders, 'orders');
  //   // reviews = this.createElements(allReviews, 'reviews');
  // }
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin/addproduct">Add Product</Link>
        </li>
        <br />
        <li>
          <Link to="/admin/putproduct">Change Product</Link>
        </li>
        <br />
        <li>
          <Link to="/admin/putcategories">Change categories</Link>
        </li>
        <br />
        <li>
          <Link to="/admin/putuser">Change User</Link>
        </li>
        <br />
        <li>
          <Link to="/admin/putorder"> Change or Process Order</Link>
        </li>
      </ul>
    </div>
  );
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
