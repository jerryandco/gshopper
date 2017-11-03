import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postCategoryThunk } from "../store/categories.js";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let name = event.target.name.value;
    let description = event.target.description.value;
    const categoryObj = {
      name,
      description
    };
    this.props.postCategory(categoryObj, this.props.ownProps.history);
  }

  render() {
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
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  postCategory: (category, history) => {
    return dispatch(postCategoryThunk(category, history));
  },
  ownProps
});

export default withRouter(connect(null, mapDispatchToProps)(AddCategory));
