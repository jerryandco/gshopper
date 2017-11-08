import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { putOrderThunk } from '../store/orders.js';
import history from '../history'

class PutOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStatus: '',
      orderByStatus: [],
      singleOrder: {},
      updateStatus: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStatusSelect = this.handleStatusSelect.bind(this);
    this.handleOrderSelect = this.handleOrderSelect.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const OrderObj = {};
    if (event.target.status){
      if (this.state.selectStatus !== event.target.status.value) {
        OrderObj.status = event.target.status.value;
      }
    }
    if (event.target.address) {
      if (event.target.address.value.length > 0) {
        OrderObj.address = event.target.address.value;
      }
    }
    if (Object.keys(OrderObj).length > 0) {
      OrderObj.id = this.state.singleOrder.id;
      console.log(OrderObj);
      this.props.putOrder(OrderObj);
    } else {
      history.push('/admin');
    }
  }

  handleOrderSelect(event) {
    event.preventDefault();
    const singleOrder = this.props.orders.find(order => {
      return +event.target.order.value === order.id;
    })
    this.setState({ singleOrder });
  }

  handleStatusSelect(event) {
    event.preventDefault();
    this.setState({ selectStatus: event.target.status.value })
  }

  handleProcessing() {
    this.setState({
      updateStatus: 'Processing'
    })
  }

  render() {
    const orders = this.props.orders;
    const status = ['Created', 'Processing', 'Cancelled', 'Completed'];
    return (
      <div>
        {
          this.props.orders &&
          <form onSubmit={this.handleStatusSelect}>
            <select className="browser-default" name="status">
              {status.map((statu) => {
                return (<option value={statu} key={statu}>{statu}</option>)
              })}
            </select>
            <input type="submit" value="select the Status to change" />
          </form>
        }
        {
          this.state.selectStatus.length > 0 && (
            <form onSubmit={this.handleOrderSelect}>
              <select className="browser-default" name="order">
                {orders.filter(order => {
                  return order.status === this.state.selectStatus
                }).map((order) => {
                  return (<option value={order.id} key={order.id + order.address}>{order.id + ' ' + order.address}</option>)
                })}
              </select>
              <input type="submit" value="select the Order to change" />
            </form>
          )}
        <form onSubmit={this.handleSubmit}>
          <label>
            Address:
            <input type="text" name="address" autoFocus />
          </label>
          {
            this.state.selectStatus === 'Processing' &&
            (<select className="browser-default" name="status">
              <option key="2" value="Processing">
                Processing
              </option>
              <option key="3" value="Cancelled">
                Cancelled
              </option>
              <option key="4" value="Completed">
                Completed
              </option>
            </select>)
          }
          {
            this.state.selectStatus === 'Created' &&
            (<select className="browser-default" name="status">
              <option key="1" value="Created">
                Created
              </option>
              <option key="2" value="Processing">
                Processing
              </option>
            </select>)
          }
          <input type="submit" value="Submit" disabled={!this.state.singleOrder} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putOrder: (order) => {
      return dispatch(putOrderThunk(order));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PutOrder)
);
