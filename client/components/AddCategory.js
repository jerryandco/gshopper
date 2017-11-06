import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postCategoryThunk } from '../store';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.check = this.check.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // let name = event.target.name.value;
    // let description = event.target.description.value;
    const categoryObj = Object.assign({},this.state);
    if (event.target.image.value.length > 0) {
      categoryObj[event.target.image.name] = event.target.image.value;
    }
    this.props.postCategory(categoryObj);
  }

  check(){
    return this.state.name.length > 0 && this.state.description.length > 0;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={this.handleChange} autoFocus required />
          </label>
          <label>
            Description:
            <input type="text" name="description" onChange={this.handleChange} required />
          </label>
          <label>
            ImageUrl :
          <input type="url" name="image" />
          </label>
          <input type="submit" value="Submit" disabled={!this.check()} />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  postCategory: (category) => {
    return dispatch(postCategoryThunk(category));
  }
});

export default withRouter(connect(null, mapDispatchToProps)(AddCategory));
