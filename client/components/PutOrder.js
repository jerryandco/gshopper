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
    const id = +this.props.match.params.id,
      address = event.target.adress.value,
      status = event.target.status.value,
      orderObj = {status};

    if (address.length !== 0) {
      orderObj.address = {};
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
          <select name="status">
            <option key="1" value="Created">
              Created
            </option>
            <option key="2" value="Processing">
              Processing
            </option>
            <option key="3" value="Cancelled">
              Cancelled
            </option>
            <option key="4" value="Completed">
              Completed
            </option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, history) => {
  return {
    putOrder: (order, history) => {
      return dispatch(putOrderThunk(order, history));
    }
  };
};

export default withRouter(connect(_, mapDispatchToProps)(PutOrder));
