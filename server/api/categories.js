const router = require('express').Router()
const { Category, Candy, CandyCategory } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({
    include: [Candy]
  })
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Candy]
  })
    .then(foundCategory => {
      res.json(foundCategory);
    })
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
  })
    .spread((row, updatedCatagory) => {
      return Category.findOne({
        where: {
          id: updatedCatagory[0].id
        },
        include: [Candy]
      })
        .then(foundCandy => {
          res.json(foundCandy);
        })
        .catch(next);
    })
})

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(createCandy => {
      res.json(createCandy);
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.sendStatus(201);
    })
})