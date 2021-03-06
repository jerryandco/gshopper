import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Filter from './Filter.jsx';


export const Candies = props => {
  return (
    <div>
      {props.allCandies.length && (
        <div>
          <Filter type={'candy'} />
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
    allCandies: state.candies.allCandies //candies is the reducer in Combine Reducers
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// const CandiesContainer = withRouter(
//   connect(mapStateToProps)(Candies)
// );
const CandiesContainer = withRouter(
  connect(mapStateToProps)(Candies)
);
export default CandiesContainer;


