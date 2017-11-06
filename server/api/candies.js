const router = require('express').Router();
const { Candy, Category } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Candy.findAll({
    include: [Category]
  })
    .then(candies => res.status(200).json(candies))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Candy.findById(req.params.id, {
    include: [Category]
  })
    .then(foundCandy => {
      res.json(foundCandy);
    })
})

router.put('/:id/addCategory', (req, res, next) => {
  Candy.findById(req.params.id)
    .then(foundCandy => {
      return foundCandy.addCategories(req.body.id);
    })
    .then(() => {
      return Candy.findById(req.params.id, {
        include: [Category]
      })
    })
    .then(foundCandy => {
      res.json(foundCandy);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Candy.createAndAdd(req.body.candy, req.body.categories)
    .then(foundCandy => {
      res.status(201).json(foundCandy);
    })
    .catch(next);
});

router.put('/:id/', (req, res, next) => {
  Candy.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
  })
    .spread((row, updatedCandy) => {
      return Candy.findOne(updatedCandy[0].id, {
        include: [Category]
      })
    })
    .then(foundCandy => {
      res.status(200).json(foundCandy);
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Candy.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.sendStatus(204);
    })
})
