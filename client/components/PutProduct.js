import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putCandyThunk } from '../store';

class PutProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      name: '',
      description: '',
      price: 0,
      quantity: -1,
      image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    console.log(event);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAdd(event) {
    event.preventDefault();
    let categories = this.state.categories;
    categories.push(+event.target.categories.value);
    this.setState({ categories });
  }

  handleSubmit(event, id) {
    event.preventDefault();
    //this will exist when properly formatted, as in, the link will have the associated id.
    this; //To get the annoying yellow squiglies away.
    const productObj = {},
      categories = this.state.categories,
      name = this.state.name,
      description = this.state.description,
      price = this.state.price,
      image = this.state.image,
      quantity = this.state.quantity
      id = +this.props.match.params.id;

    productObj.id = id;
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
    console.log(categories, productObj, id);
    // this.props.putProduct(
    //   productObj,
    //   categories,
    //   this.props.ownProps.history
    // );
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              autoFocus
              onChange={this.handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              defaultValue="0"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              defaultValue="-1"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Image:
            <input type="text" name="image" onChange={this.handleChange} />
          </label>
        </form>
        <form onSubmit={this.handleAdd}>
          <select name="categories">
            {this.props.categories &&
              this.props.categories
                .filter(category => {
                  return this.state.categories.indexOf(+category.id) === -1;
                })
                .map(category => {
                  return (
                    <option key={category.name} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
          </select>
          <input type="submit" value="add categories" />
        </form>
        <button
          onClick={event => {
            this.handleSubmit(event, this.props.match.params);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.allCategories
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  putProduct: (product, candyCategory, history) => {
    return dispatch(putCandyThunk(product, candyCategory, history));
  },
  ownProps
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PutProduct)
);
