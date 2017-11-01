const router = require('express').Router();
const { Order } = require('../db/models');
const { OrderCandy } = require('../db/models');
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  Order.findById(req.params.id)
    .then(foundOrder => {
      res.json(foundOrder);
    })
})

router.get('/:id/detail', (req, res, next) => {
  Order.findById(req.params.id)
    .then(foundOrder => {
      return foundOrder.getCandies();
    })
    .then(allCandy => {
      res.json(allCandy);
    })
})