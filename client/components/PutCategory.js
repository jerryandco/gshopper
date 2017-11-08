import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putCategoryThunk } from '../store';
import './Admin.scss'

class PutCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      isClick: false,
      selectCategory: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    event.preventDefault();
    this.setState({
      isClick: true
    })
    let selectCategory = this.props.categories.find(category => {
      return +category.id === +event.target.categories.value
    })
    this.setState({ selectCategory });
    this.setState({ id: event.target.categories.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    const category = {};
    if (event.target.name.value.length > 0) {
      category[event.target.name.name] = event.target.name.value;
    }
    if (event.target.description.value.length > 0) {
      category[event.target.description.name] = event.target.description.value;
    }
    if (Object.keys(category).length > 0) {
      this.props.putCategory(category, this.state.selectCategory.id);
    } else {
      alert('Nothing to update');
    }
  }

  render() {
    return (
      <div>
        {this.props.categories &&
          <form onSubmit={this.handleSelect}>
            <select className="browser-default" name="categories">
              {this.props.categories.map(category => {
                return (<option value={category.id} key={category.name}>{category.name}</option>)
              })}
            </select>
            <input type="submit" value="select the category to change" />
          </form>
        }
        {this.state.isClick &&
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
            <input type="text" name="name" autoFocus placeholder={this.state.selectCategory.name} />
            </label>
            <label>
              Description:
            <input type="text" name="description" placeholder={this.state.selectCategory.description} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.allCategories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putCategory: (category, id) => {
      return dispatch(putCategoryThunk(category, id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PutCategory));
