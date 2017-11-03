import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import { postProductThunk } from "../store/products.js";
import { createOptions } from "./Admin.js";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : []
    }
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
      console.log(event.target.categories.selected);
      console.log(categories);
    // categories = categories.map(category => {
    //   return +category.id;
    // });
    //Need to associate candyId after candy is created
    // candyCategoryArr = categories;
    console.log(candyCategoryArr);
    // this.props.postProduct(
    //   productObj,
    //   candyCategoryArr,
    //   this.props.ownProps.history
    // );
  }

  render() {
    console.log('i am here');
    let isMounted = this.props.categories,
    categories = this.props.categories,
    categoryOptions = null;
    console.log('here',categories);
    if (isMounted) {
      categoryOptions = createOptions(categories, 'categories');
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" autoFocus  required/>
          </label>
          <label>
            Description:
            <input type="text" name="description" required />
          </label>
          <label>
            Price:
            <input type="number" name="price" required />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" required />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
          <select name="categories" multiple={true} values={[]}>
            {this.props.categories.map(category=>{
              return (
                <option key={category.name} value={categories.name}>
                {category.name}
              </option>
              )
            })}
          </select>

          <input type="submit" value="Submit" required />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  console.log(state);
  return {
    categories: state.categories.allCategories

  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  postProduct: (candy, candyCategories) => {
    //return dispatch(postCandyThunk(candy, candyCategories, history));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProduct)
);
