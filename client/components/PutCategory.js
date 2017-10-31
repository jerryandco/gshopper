import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { putCategoryThunk } from "../store/categories.js";

class PutCategory extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const categoryObj = {};
    if (name.length !== 0) {
      categoryObj.name = {};
    }
    if (description.length !== 0) {
      categoryObj.description = description;
    }
    this.props.putCategory(categoryObj, this.props.ownProps.history);
  }

  grabCategory(table) {
    const id = Number(this.props.match.params.id);
    const filter = table.filter(row => {
      return row.id === id;
    });
    const row = filter[0];
    return row;
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

const mapDispatchToProps = (dispatch, history) => {
  return {
    putCategory: (category, history) => {
      return dispatch(putCategoryThunk(category, history));
    }
  };
};

export default withRouter(connect(_, mapDispatchToProps)(PutCategory));
