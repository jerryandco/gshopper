const router = require('express').Router();
const { Order, Candy } = require('../db/models');
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [Candy]
  })
    .then(orders => {
      res.json(orders);
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, {
    include: [Candy]
  })
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

router.post('/', (req, res, next) => {
  let id = 0; // { order : {} , candies : [id,quantity,price]} => req.body
  Order.create(req.body.order)
    .then(createdOrder => {
      id = createdOrder.id;
      const addRelationPromise = req.body.candies.map(candy => {
        return createdOrder.setCandies([candy.id], {
          through: {
            price: candy.price,
            quantity: candy.quantity
          }
        })
      })
      return Promise.all(addRelationPromise);
    })
    .then(() => {
      return Order.findById(id, { include: [Candy] })
        .then(foundCandy => res.json(foundCandy))
        .catch(next);
    })
})

router.put('/:id', (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
    .spread((row, updatedOrder) => {
      return Order.findById(updatedOrder[0].id, {
        include: [Candy]
      });
    })
    .then((foundOrder => res.json(foundOrder)))
    .catch(next);
})