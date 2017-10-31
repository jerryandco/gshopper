const Sequelize = require('sequelize');
const db = require('../db');
const Candy = require('./candy');
const User = require('./user');

const Review = db.define('review', {
    review: Sequelize.TEXT
}, {
        defaultScope: {
            include: [User, Candy]
        }

});

module.exports = Review;
