import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import AddToCart from './AddToCart.jsx';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candiesSearch: this.props.allCandies,
      categoriesSearch: this.props.allCategories
    };
    console.log('state', this.props);
    this.handleFilterForm = this.handleFilterForm.bind(this);
  }


  handleFilterForm = event => {
    if (event.target.value.length === 0) {
      this.setState({ candiesSearch: this.props.allCandies });
      this.setState({ categoriesSearch: this.props.allCategories });
    } else if (event.target.placeholder === 'Category Name') {
      let searchedCategory = this.props.allCategories.filter(
        category =>
          category.name.includes(event.target.value) ||
          category.name.toLowerCase().includes(event.target.value)
      );
      this.setState({ categoriesSearch: searchedCategory });
    } else if (event.target.placeholder === 'Candy Name') {
      let searchedCandy = this.props.allCandies.filter(
        candy =>
          candy.name.includes(event.target.value) ||
          candy.name.toLowerCase().includes(event.target.value)
      );
      this.setState({ candiesSearch: searchedCandy });
    }
  };

  render() {
    if (this.props.allCandies.length && this.props.allCategories.length) {
      return (
        <div className="filter-list">
          <form>
            <fieldset className="form-group">
              <input
                type="text"
                placeholder="Candy Name"
                onChange={this.handleFilterForm}
              />
              <input
                type="text"
                placeholder="Category Name"
                onChange={this.handleFilterForm}
              />
            </fieldset>
          </form>

          {this.props.type === 'candy' &&
            this.state.candiesSearch.map(candy => (
              <div className="all-candies" key={candy.id}>
                <NavLink to={`/candies/${candy.id}`}>
                  <h2>{candy.name}</h2>
                  <img src={candy.image} className="image" />
                </NavLink>
                <h3>{candy.description}</h3>
                <h3>Stock: {candy.quantity}</h3>
                <AddToCart />
              </div>
            ))}
          {this.props.type === 'category' &&
            this.state.categoriesSearch.map(category => (
              <div className="all-categories" key={category.id}>
                <NavLink to={`/categories/${category.id}`}>
                  <h2>{category.name}</h2>
                  <img src={category.image} className="image" />
                </NavLink>
                <h3>{category.description}</h3>
              </div>
            ))}
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

/**
   * CONTAINER
   */
const mapStateToProps = state => {
  return {
    allCategories: state.categories.allCategories,
    allCandies: state.candies.allCandies
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps)(Filter));
