const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Candy = require('./candy');

const Order = db.define('order', {
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.ENUM(['Created', 'Processing', 'Cancelled', 'Completed']),
        defaultValue: 'Created'
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    price: {
        type: Sequelize.DOUBLE
    }
},
    {
        scopes: {
            populated: () => ({
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }, {
                    model: Candy
                }]
            })
        }
    });

Order.createWithCandy = function (detail, candies) {
    let id = 0;
    return Order.create(detail)
        .then(createdOrder => {
            id = createdOrder.id;
            const addRelationPromise = candies.map(candy => {
                return createdOrder.setCandies([candy.id], {
                    through: {
                        price: candy.price,
                        quantity: candy.quantity
                    }
                })
            })
            return Promise.all(addRelationPromise);
        })
        .then(() => {
            return Order.scope('populated').findById(id)
        });
}

module.exports = Order;
