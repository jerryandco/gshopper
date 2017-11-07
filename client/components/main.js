import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  if (!window.localStorage.cart) {
    window.localStorage.cart = JSON.stringify({})
  } else if (window.localStorage.cart[0] !== '{') {
    window.localStorage.cart = JSON.stringify({})
  }
  const { children, handleClick, isLoggedIn, isAdmin } = props
  return (
    <div>
      <h1>Welcome to the Candy Shop</h1>
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/">Home</Link>
              <Link to="/candies">All Candy</Link>
              <Link to="/categories">All Categories</Link>
              <Link to="/cart"> Cart </Link>
              <Link to="/order"> Order </Link>
              {isAdmin &&
                (<Link to="/admin"> Admin </Link>)
              }
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/candies">All Candy</Link>
              <Link to="/categories">All Categories</Link>
              <Link to="/cart"> Cart </Link>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
