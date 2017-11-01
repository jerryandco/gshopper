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

router.put('/:id/addCategory', (req, res, next) => {
  Candy.findById(req.params.id)
    .then(foundCandy => {
      return foundCandy.addCategories(req.body.id);
    })
    .then(() => {
      res.json(req.body.id);
    })
})

router.get('/:id', (req, res, next) => {
  Candy.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Category,
      through: 'candy_category'
    }]
  })
    .then(founded => {
      res.json(founded);
    })
});