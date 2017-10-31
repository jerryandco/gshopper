import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postProductThunk } from "../store/products.js";

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
    const productObj = {
      name,
      price,
      image,
      quantity,
      description
    };
    this.props.postProduct(productObj, this.props.ownProps.history);
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
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  postProduct: (product, history) => {
    return dispatch(postProductThunk(product, history));
  },
  ownProps
});

export default withRouter(connect(_, mapDispatchToProps)(AddProduct));
