const router = require('express').Router()
const { Candy, Category, CandyCategory } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Candy.findAll({
    include: {
      model: Category,
      through: CandyCategory
    }
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Candy.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Category,
      through: CandyCategory
    }
  })
    .then(foundCandy => {
      res.json(foundCandy);
    })
})

router.post('/:id/addCategory', (req, res, next) => {
  Candy.findById(req.params.id)
    .then(foundCandy => {
      return foundCandy.addCategories(req.body.id);
    })
    .then(() => {
      res.json(req.body.id);
    })
});

router.delete('/:id', (req, res, next) => {
  Candy.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.sendStatus(201);
    })
})

router.post('/', (req, res, next) => {
  Candy.create(req.body.candy)
    .then(createCandy => {
      return createCandy.addCategories(req.body.categories);
    })
    .then(() => {
      return Candy.findOne({
        where: {
          name: req.body.candy.name
        },
        include: {
          model: Category,
          through: CandyCategory
        }
      })
    })
    .then(found => {
      res.json(found);
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