const Sequelize = require('sequelize');
const db = require('../db');
const Candy = require('./candy');

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


Category.updateCandy = function (id, detail) {
    return Category.update(detail, {
        where: {
            id
        },
        returning: true,
    })
        .then(() => {
            return Category.findById(
                id
                , {
                    include: [Candy]
                })
        })
}

module.exports = Category;
