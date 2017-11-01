const User = require('./user')
const Order = require('./order');
const OrderCandy = require('./orderCandy');
const Review = require('./review');
const Candy = require('./candy');
const Category = require('./category');
const CandyCategory = require('./candyCategory');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
User.hasMany(Order, { onDelete: 'CASCADE', hooks: true });
Order.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Review, { onDelete: 'CASCADE', hooks: true });
Review.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Candy.hasMany(Review, { onDelete: 'CASCADE', hooks: true });
Review.belongsTo(Candy, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Candy.belongsToMany(Order, { through: OrderCandy });
Order.belongsToMany(Candy, { through: OrderCandy });

Candy.belongsToMany(Category, { through: CandyCategory }); //candy get all category function
Category.belongsToMany(Candy, { through: CandyCategory }); //category get all candy function


module.exports = {
  User,
  Candy,
  Category,
  Order,
  OrderCandy,
  Review,
  CandyCategory
}
