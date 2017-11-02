const router = require('express').Router();
const { Candy, Category, CandyCategory } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Candy.findAll({
    include: {
      model: Category,
      through: CandyCategory
    }
  })
    .then(candies => res.status(200).json(candies))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Candy.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        through: 'candy_category'
      }
    ]
  }).then(founded => {
    res.status(200).json(founded);
  });
});

router.put('/:id/addCategory', (req, res, next) => {
  Candy.findById(req.params.id)
    .then(foundCandy => {
      return foundCandy.addCategories(req.body.id);
    })
    .then(() => {
      res.status(200).json(req.body.id);
    });
});
