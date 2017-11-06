const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'] })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/current', (req, res, next) => {
  req.user.update(req.body)
    .then(user => {
      req.user = user;
      res.sendStatus(201);
    })
})

router.put('/admin', (req, res, next) => {
  User.update({
    where: {
      id: req.params.id
    },
    returning: true
  })
    .spread((row, updateUser) => {
      return User.findById(updateUser[0].id)
    })
    .then(foundUser => res.json(foundUser))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next)
})
