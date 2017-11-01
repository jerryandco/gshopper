import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { putCategoryThunk } from "../store/categories.js";
import { createOptions } from "./Admin.js";

class PutCategory extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = +this.props.match.params.id,
      name = event.target.name.value,
      description = event.target.description.value,
      candies = event.target.candies.value,
      categoryObj = { id };
    if (name.length !== 0) {
      categoryObj.name = name;
    }
    if (description.length !== 0) {
      categoryObj.description = description;
    }
    const candyCategoryObj = {};
    candies = candies.map(candy => candy.id);
    candyCategoryObj.categoryId = id;
    candyCategoryObj.candies = candies;
    //candyCategoryObj is not yet ready for post to candy category, must loop through array
    this.props.putCategory(
      categoryObj,
      candyCategoryObj,
      this.props.ownProps.history
    );
  }

  render() {
    let isMounted = this.props.candies,
      candies = this.props.candies,
      candyOptions = null;
    if (isMounted) {
      candyOptions = createOptions(candies, "candies");
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" autoFocus />
          </label>
          <label>
            Description:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
          {isMounted && candyOptions}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    candies: state.candies
  };
};

const mapDispatchToProps = (dispatch, history) => {
  return {
    putCategory: (category, candyCategory, history) => {
      return dispatch(putCategoryThunk(category, candyCategory, history));
    }
  };
};

export default withRouter(connect(_, mapDispatchToProps)(PutCategory));
