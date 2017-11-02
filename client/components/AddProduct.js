import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postCandyThunk } from "../store/candies.js";
import { createOptions } from "./Admin.js";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let name = event.target.name.value,
      price = +event.target.price.value,
      image = event.target.image.value,
      quantity = +event.target.quantity.value,
      description = event.target.description.value,
      categories = event.target.categories.value,
      productObj = {
        name,
        price,
        image,
        quantity,
        description
      },
      candyCategoryArr = [];

    categories = categories.map(category => {
      return +category.id;
    });

    //Need to associate candyId after candy is created
    candyCategoryArr = categories;
    this.props.postProduct(
      productObj,
      candyCategoryArr,
      this.props.ownProps.history
    );
  }

  render() {
    let isMounted = this.props.categories,
      categories = this.props.categories,
      categoryOptions = null;
    if (isMounted) {
      categoryOptions = createOptions(categories, "categories");
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
          <label>
            Price:
            <input type="number" name="price" />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
          <input type="submit" value="Submit" />
          {isMounted && categoryOptions}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  postProduct: (candy, candyCategories, history) => {
    return dispatch(postCandyThunk(candy, candyCategories, history));
  },
  ownProps
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProduct)
);
