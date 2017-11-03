import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postCandyThunk } from "../store/candies.js";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      Image: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.check = this.check.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAdd(event) {
    event.preventDefault();
    let categories = this.state.categories;
    categories.push(+event.target.categories.value);
    this.setState({ categories });
  }

  check() {
    return this.state.quantity > 0 && this.state.description.length > 0 && this.state.name.length > 0 && this.state.price > 0 && this.state.quantity > 0
  }

  handleSubmit(event) {
    event.preventDefault();
    const candy = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity
    }
    const categories = this.state.categories;

    if (this.state.Image.length > 0) candy['image'] = this.state.image
    this.props.postProduct(candy, categories);
  }

  render() {
    console.log('this is props', this.props);
    if (this.props.categories.length) {
      console.log(this.props.categories[0].id === 1);
      if (this.state.categories.length) console.log('check here', this.state.categories[0]);
    }
    return (
      <div>
        <form>
          <label>
            Name:
            <input type="text" name="name" autoFocus required onChange={this.handleChange} />
            {this.state.name.length === 0 && (
              <span>{"Name can't be empty"}</span>
            )}
          </label>
          <label>
            Description:
            <input type="text" name="description" required onChange={this.handleChange} />
          </label>
          <label>
            Price:
            <input type="number" name="price" required onChange={this.handleChange} />
            {this.state.price <= 0 && (
              <span>Price has to be greater</span>
            )}
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" required onChange={this.handleChange} />
            {this.state.quantity <= 0 && (
              <span>Quantity has to be greater</span>
            )}
          </label>
          <label>
            Image:
            <input type="text" name="image" onChange={this.handleChange} />
          </label>
        </form>
        <form onSubmit={this.handleAdd}>
          <select name="categories">
            {this.props.categories && this.props.categories.filter(category => {
              return this.state.categories.indexOf(+category.id) === -1;
            }).map(category => {
              return (
                <option key={category.name} value={category.id}>
                  {category.name}
                </option>
              )
            })}
          </select>
          <input type="submit" value="add categories" />
        </form>
        <button onClick={this.handleSubmit} disabled={!this.check()}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    categories: state.categories.allCategories
  }
};

const mapDispatchToProps = (dispatch) => ({
  postProduct: (candy, candyCategories) => {
    return dispatch(postCandyThunk(candy, candyCategories));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProduct)
);
