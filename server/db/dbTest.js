const Sequelize = require('sequelize')
const db = new Sequelize(
   'postgres://localhost:5432/boilermaker-test', {
    logging: false
  }
)
module.exports = db
