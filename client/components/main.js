import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store';
import './main.scss';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = props => {
  if (!window.localStorage.cart) {
    window.localStorage.cart = JSON.stringify({});
  } else if (window.localStorage.cart[0] !== '{') {
    window.localStorage.cart = JSON.stringify({});
  }
  const { children, handleClick, isLoggedIn } = props;
  return (
    <div className="home-page">
      {isLoggedIn ? (
        <nav className="purple lighten-5">
          <div className="nav-wrapper" id="navbar">
            <ul className="left hide-on-med-and-down">
              {/* The navbar will show these links after you log in */}
              <li className="home-list-item #42a5f5 blue lighten-1">
                <Link className="home-link" to="/" />
              </li>
              <li className="candy-list-item #ff5252 red accent-2">
                <Link className="candy-link" to="/candies" />
              </li>
              <li className="categories-list-item #283593 indigo darken-3">
                <Link className="category-link" to="/categories" />
              </li>
              <li className="cart-list-item #fdd835 yellow darken-1">
                <Link className="cart-link" to="/cart" />
              </li>
              <li className="order-list-item #1de9b6 teal accent-3">
                <Link className="order-link" to="/order" />
              </li>
              <li className="logout-list-item #f44336 red">
                <a className="logout-link" href="#" onClick={handleClick}>
                  {' '}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav>
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/candies">All Candy</Link>
            <Link to="/categories">All Categories</Link>
            <Link to="/cart"> Cart </Link>
            <Link to="/admin">Admin </Link>
          </div>
        </nav>
      )}
      {children}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
