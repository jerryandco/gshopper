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

router.put('/:id/addCategory', (req, res, next) => {
  Candy.findById(req.params.id)
    .then(foundCandy => {
      return foundCandy.addCategories(req.body.id);
    })
    .then(() => {
      res.json(req.body.id);
    })
});

router.post('/', (req, res, next) => {
  let candyId = 0;
  Candy.create(req.body.candy)
    .then(createdCandy => {
      candyId = createdCandy.id;
      return createdCandy.setCategories(req.body.categories);

    })
    .then(() => {
      return Candy.findOne({
        where: {
          id: candyId
        },
        include: {
          model: Category,
          through: CandyCategory
        }
      })
    })
    .then(foundCandy => {
      res.status(201).json(foundCandy);
    })
    .catch(next);
});
