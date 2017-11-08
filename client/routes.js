import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import { Main, Login, Signup, UserHome } from './components';
import { me } from './store';
import Candies from './components/Candies.jsx';
import Categories from './components/Categories.jsx';
import SingleCandy from './components/SingleCandy.jsx';
import Cart from './components/Cart.jsx';
import SingleCategory from './components/SingleCategory.jsx';
import Home from './components/Home.jsx';
import Order from './components/Order.jsx'
import { fetchCategories } from './store/categories.js';
import { fetchCandies } from './store/candies.js';
import { fetchOrders } from './store/orders.js';
import { fetchUsersThunk } from './store/users.js';
import Admin from './components/Admin.js';
// import PutCategory from './components/PutCategory.js';
import PutOrder from './components/PutOrder.js';
import PutProduct from './components/PutProduct.js';
import PutUser from './components/PutUser.js';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;


    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/candies/:id" component={SingleCandy} />
                  <Route path="/candies" component={Candies} />
                  <Route path="/categories/:id" component={SingleCategory} />
                  <Route path="/categories" component={Categories} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/home" component={UserHome} />
                  <Route path="/order" component={Order} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            {/* <Route component={Login} /> */}\
            <Route path="/candies/:id" component={SingleCandy} />
            <Route path="/candies" component={Candies} />
            <Route path="/categories/:id" component={SingleCategory} />
            <Route path="/categories" component={Categories} />
            <Route path="/cart" component={Cart} />
            <Route path="/putorder" component={PutUser} />
            <Route path="/admin" component={Admin} />
            <Route path="/usersedit/:id" component={PutUser} />
            <Route path="/candiesedit/:id" component={PutProduct} />
            <Route path="/ordersedit/:id" component={PutOrder} />
            {/*<Route path="/categoriesedit/:id" component={PutCategory} />*/}
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchCategories());
      dispatch(fetchCandies());
      dispatch(fetchUsersThunk());
      dispatch(fetchOrders());
    }
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
