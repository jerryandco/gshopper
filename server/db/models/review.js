const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');

const Review = db.define('review', {
    review: Sequelize.TEXT,
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
        scopes: {
            populated: () => ({
                include: [{
                    model: User,
                    attributes: ['firstName', 'lastName', 'email']
                }]
            })
        }
    });

module.exports = Review;

Review.beforeCreate(review => {
    if (review.stars > 5) review.stars = 5;
    else if (review.stars < 0) review.stars = 0;
})
