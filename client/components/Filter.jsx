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
          {this.props.type === 'candy' && (
            <div className="individual-candy-container">
              <h5>Search For A Candy</h5>
              <form>
                <fieldset>
                  <input
                    type="text"
                    placeholder="Candy Name"
                    onChange={this.handleFilterForm}
                  />
                </fieldset>
              </form>

              {this.state.candiesSearch.map(candy => (
                <div className="row" key={candy.id}>
                  <div className="col s12 m5">
                    <div className="card large">
                      <div className="card-image">
                        <img src={candy.image} className="image" />
                        <span className="card-title"> {candy.name} </span>
                      </div>
                       <div className="card-content">
                        <p>{candy.description}</p>
                       </div>
                      <div className="card-action">
                        <NavLink to={`/candies/${candy.id}`}>
                        View Candy
                        </NavLink>
                        <AddToCart item={candy} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {this.props.type === 'category' && (
            <div>
              <h4>Search For A Category</h4>
              <form>
                <fieldset className="form-group">
                  <input
                    type="text"
                    placeholder="Category Name"
                    onChange={this.handleFilterForm}
                  />
                </fieldset>
              </form>
              {this.state.categoriesSearch.map(category => (
                <div className="all-categories" key={category.id}>
                  <NavLink to={`/categories/${category.id}`}>
                    <h2>{category.name}</h2>
                    <img src={category.image} className="image" />
                  </NavLink>
                  <h3>{category.description}</h3>
                </div>
              ))}
            </div>
          )}
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
