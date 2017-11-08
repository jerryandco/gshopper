const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'] })
    .then(users => res.json(users))
    .catch(next)
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

router.put('/:id', (req, res, next) => {
  console.log(req.body);
  User.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
    .spread((row, updateUser) => {
      console.log(updateUser[0]);
      res.json(updateUser[0]);
    })
    .catch(next);
})
