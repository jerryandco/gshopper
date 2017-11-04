import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { putProductThunk } from "../store/products.js";
import { createOptions } from "./Admin.js";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    //this will exist when properly formatted, as in, the link will have the associated id.
    // let id = +this.props.match.params.id,
      let name = event.target.name.value,
      price = +event.target.price.value,
      image = event.target.image.value,
      quantity = +event.target.quantity.value,
      description = event.target.description.value,
      categories = event.target.categories.value,
      productObj = {},
      candyCategoryArr = [];

    if (name.length !== 0) {
      productObj.name = name;
    }
    if (price !== 0) {
      productObj.price = price;
    }
    if (image.length !== 0) {
      productObj.image = image;
    }
    if (quantity !== -1) {
      productObj.quantity = quantity;
    }
    if (description.length !== 0) {
      productObj.description = description;
    }

    categories = categories.map(category => {
      return +category.id;
    });
    //Need to associate candyId after candy is created
    candyCategoryArr = categories;

    this.props.putProduct(
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
            <input type="number" name="price" value="0" />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value="-1" />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
          {isMounted && categories}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  putProduct: (product, candyCategory, history) => {
    return dispatch(putProductThunk(product, candyCategory, history));
  },
  ownProps
});

export default withRouter(connect(_, mapDispatchToProps)(AddProduct));
