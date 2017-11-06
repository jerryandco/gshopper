const Sequelize = require('sequelize');
const db = require('../db');
const Category = require('./category');

const Candy = db.define('candy', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
    },
    image: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        },
        defaultValue: 'http://s7.orientaltrading.com/is/image/OrientalTrading/candy-candycanes-110216-1x1?$NOWA$&$1X1Main$&'
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
});

Candy.createAndAdd = function (detail, categories) {
    let candyId = 0;
    return Candy.create(detail)
      .then(createdCandy => {
        candyId = createdCandy.id;
        return createdCandy.setCategories(categories);
      })
      .then(() => {
        return Candy.findById(candyId, {
          include: [Category]
        })
      })
}


module.exports = Candy;
