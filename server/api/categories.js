const router = require('express').Router()
const { Category, Candy } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({
    include: [Candy]
  })
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Category.findById(req.params.id, {
    include: [Candy]
  })
    .then(foundCategory => {
      res.json(foundCategory);
    })
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Category.updateCandy(req.params.id, req.body)
    .then(foundCandy => {
      res.json(foundCandy);
    })
    .catch(next);
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
