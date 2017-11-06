const Sequelize = require('sequelize');
const db = require('../db');
const Candy = require('./candy');
const User = require('./user');

const Review = db.define('review', {
    review: Sequelize.TEXT,
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
        defaultScope: {
            include: [User, Candy]
        }

    });

module.exports = Review;

Review.beforeCreate(review => {
    if (review.stars > 5) review.stars = 5;
    else if (review.stars < 0) review.stars = 0;
})
