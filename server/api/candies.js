const router = require('express').Router()
const {Candy} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Candy.findAll()
    .then(users => res.json(users))
    .catch(next)
})
