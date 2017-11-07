import { connect } from 'react-redux';
import React from 'react';

const Order = (props) => {
    let orders = [];
    if (props.user) {
        if (!props.user.isAdmin) {
            orders = props.orders.filter(singleOrder => singleOrder.userId === props.user.id)
        } else {
            orders = props.orders;
        }
    }
    return (
        <div>
            {
                orders.map(singleOrder => {
                    return (
                        <div key={singleOrder.id}>
                            <label>
                                id : {singleOrder.id}
                            </label>
                            <label>
                                address : {singleOrder.address}
                            </label>
                            <label>
                                price : {singleOrder.price}
                            </label>
                            <label>
                                status : {singleOrder.status}
                            </label>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Candy name</th>
                                        <th>quantity</th>
                                        <th>price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        singleOrder.candies.map(candy => {
                                            return (
                                                <tr key={candy.id}>
                                                    <th scope="row">{singleOrder.id}</th>
                                                    <td>{candy.name}</td>
                                                    <td>{candy.ordercandy.quantity}</td>
                                                    <td>{candy.ordercandy.price}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table >
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        user: state.user
    }
}


export default connect(mapStateToProps)(Order);
