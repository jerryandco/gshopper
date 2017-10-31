const Sequelize = require('sequelize');
const db = require('../db');

const OrderCandy = db.define('ordercandy', {
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
});

module.exports = OrderCandy;
