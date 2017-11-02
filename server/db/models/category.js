const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        defaultValue: '/images/cavendishcandy.jpg'
    }
});

module.exports = Category;