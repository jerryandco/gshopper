import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { putProductThunk } from "../store/products.js";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let name = event.target.name.value;
    let price = +event.target.price.value;
    let image = event.target.image.value;
    let quantity = +event.target.quantity.value;
    let description = event.target.description.value;
    const productObj = {};
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
    this.props.putProduct(productObj, this.props.ownProps.history);
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  putProduct: (product, history) => {
    return dispatch(putProductThunk(product, history));
  },
  ownProps
});

export default withRouter(connect(_, mapDispatchToProps)(AddProduct));
