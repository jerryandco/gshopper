import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from './Home.jsx';
import './user-home.scss';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props;

  return (
    <div className="user-home">
      <h3>Welcome, {email}</h3>
      <Home />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
