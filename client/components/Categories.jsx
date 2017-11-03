import React from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Filter from './Filter.jsx';

const Categories = props => {
  return (
    <div>
      {props.categories.length && (
        <div>
          <h1>All Categories</h1>
          <Filter type={'category'} />
        </div>
      )}
    </div>
  );
};

/**
   * CONTAINER
   */
const mapStateToProps = state => {
  return {
    categories: state.categories.allCategories
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps)(Categories));
