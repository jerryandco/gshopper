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
    <div>
      <h1>Welcome to the Candy Shop</h1>
      <nav>
        {isLoggedIn ? (
          <div className="nav-wrapper">
            <a href="#" className="brand-logo right" />
            <ul id="navbar" className="left hide-on-med-and-down">
              {/* The navbar will show these links after you log in */}
              <li className="home-link">
                <Link className="#42a5f5 blue lighten-1" to="/">
                  Home
                </Link>
              </li>
              <li className="candy-link">
                <Link className="#ff5252 red accent-2" to="/candies">
                  All Candy
                </Link>
              </li>
              <li className="category-link">
                <Link className="#283593 indigo darken-3"to="/categories">
                  All Categories
                </Link>
              </li>
              <li className="cart-link">
                <Link className="#fdd835 yellow darken-1"to="/cart">
                  {' '}
                  Cart{' '}
                </Link>
              </li>
              <Link to="/order"> Order </Link>
              <li className="logout-link #f44336 red">
                <a
                  href="#"
                  onClick={handleClick}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
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
        )}
      </nav>
      <hr />
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
