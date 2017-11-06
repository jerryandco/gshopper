const router = require('express').Router();
const { Order, Candy } = require('../db/models');
module.exports = router

router.get('/', (req, res, next) => {
  Order.scope('populated').findAll()
    .then(orders => {
      res.json(orders);
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.scope('populated').findById(req.params.id)
    .then(foundOrder => {
      res.json(foundOrder);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  // { order : {} , candies : [id,quantity,price]} => req.body
  Order.createWithCandy(req.body.order, req.body.candies)
    .then(foundCandy => res.json(foundCandy))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
    .spread((row, updatedOrder) => {
      return Order.scope('populated').findById(updatedOrder[0].id);
    })
    .then((foundOrder => res.json(foundOrder)))
    .catch(next);
})