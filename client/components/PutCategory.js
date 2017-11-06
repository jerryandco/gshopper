import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putCategoryThunk } from '../store';

class PutCategory extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, id) {
    event.preventDefault();
    const category = {};
    if (event.target.name.value.length > 0) {
      category[event.target.name.name] = event.target.name.value;
    }
    if (event.target.description.value.length > 0) {
      category[event.target.description.name] = event.target.description.value;
    }
    if (Object.keys(category).length > 0) {
      this.props.putCategory(category, id);
    } else {
      alert("Nothing to update");
    }
  }

  render() {
    const id = this.props.match.params.id;
    return (
      <div>
        <form onSubmit={(event) => { this.handleSubmit(event, id) }}>
          <label>
            Name:
            <input type="text" name="name" autoFocus />
          </label>
          <label>
            Description:
            <input type="text" name="description" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    putCategory: (category, candyCategory) => {
      return dispatch(putCategoryThunk(category, candyCategory));
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(PutCategory));
