import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { putOrderThunk } from "../store/orders.js";

class PutOrder extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const address = event.target.adress.value;
    const status = event.target.status.value;
    const orderObj = {};
    if (address.length !== 0) {
      orderObj.address = {};
    }
    if (status.length !== 0) {
      orderObj.status = status;
    }
    this.props.putOrder(orderObj, this.props.ownProps.history);
  }

  render() {
    const orders = this.props.orders;
    return (
      <div>
        {orders && <p>Order placed: {}</p>}
        <form onSubmit={this.handleSubmit}>
          <label>
            Address:
            <input type="text" name="name" autoFocus />
          </label>
          <label>
            Status:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, history) => {
  return {
    putCategory: (category, history) => {
      return dispatch(putOrderThunk(category, history));
    }
  };
};

export default withRouter(connect(_, mapDispatchToProps)(PutOrder));
