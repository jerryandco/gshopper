import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putCandyThunk } from '../store';

class PutProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectCandy: {},
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      image: '',
      isClick: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const updateCandy = {};
    if (this.state.name.length > 0) {
      updateCandy.name = this.state.name
    }
    if (this.state.description.length > 0) {
      updateCandy.description = this.state.description
    }
    if (this.state.image.length > 0) {
      updateCandy.image = this.state.image;
    }
    if (+this.state.price > 0) {
      updateCandy.price = this.state.price;
    }
    if (+this.state.quantity > 0) {
      updateCandy.quantity = this.state.quantity;
    }
    updateCandy.id = this.state.selectCandy.id;
    this.props.putProduct(updateCandy);

  }

  handleSelect(event) {
    event.preventDefault();
    this.setState({
      isClick: true
    })
    let selectCandy = this.props.allCandies.find(candy => {
      return +candy.id === +event.target.candy.value;
    })
    this.setState({ selectCandy })
  }

  render() {
    return (
      <div>
        {
          this.props.allCandies &&
          <form onSubmit={this.handleSelect}>
            <select name="candy">
              {this.props.allCandies.map(candies => {
                return (<option value={candies.id} key={candies.name}>{candies.name}</option>)
              })}
            </select>
            <input type="submit" value="select the candy to change" />
          </form>
        }
        {
          this.state.isClick &&
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input
                  type="text" name="name" autoFocus
                  onChange={this.handleChange}
                  placeholder={this.state.selectCandy.name} />
              </label>
              <label>
                Description:
                <input
                  type="text" name="description"
                  onChange={this.handleChange}
                  placeholder={this.state.selectCandy.description} />
              </label>
              <label>
                Price:
            <input
                  type="number" name="price"
                  onChange={this.handleChange}
                  placeholder={this.state.selectCandy.price} />
              </label>
              <label>
                Quantity:
            <input
                  type="number" name="quantity"
                  onChange={this.handleChange}
                  placeholder={this.state.selectCandy.quantity}
                  min={0} />
              </label>
              <label>
                Image:
              <input
                  type="text" name="image"
                  onChange={this.handleChange} />
              </label>
              <input type="submit" value="Update my change" />
            </form>
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories.allCategories,
    allCandies: state.candies.allCandies
  };
};

const mapDispatchToProps = (dispatch) => ({
  putProduct: (product) => {
    return dispatch(putCandyThunk(product));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PutProduct)
);
