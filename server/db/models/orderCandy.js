const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./order');
const Candy = require('./candy');


const OrderCandy = db.define('ordercandy', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 0
        }
    }
}, {
        defaultScope: {
            include: [Order, Candy]
        }
});

module.exports = OrderCandy;
