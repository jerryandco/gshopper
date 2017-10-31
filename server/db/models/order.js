const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Order = db.define('order', {
    Address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.ENUM(['Created', 'Processing', 'Cancelled', 'Completed']),
        defaultValue: 'Created'
    }
},
    {
        defaultScope: {
            include: [User]
        }
    });

module.exports = Order;
