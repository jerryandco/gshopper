const router = require('express').Router();
const { Candy, Category, CandyCategory } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Candy.findAll({
    include: [Category]
  })
    .then(candies => res.status(200).json(candies))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Candy.findOne({
    where: {
      id: req.params.id
    },
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
      return Candy.findOne({
        where: {
          id: req.params.id
        },
        include: [Category]
      })
    })
    .then(foundCandy => {
      res.json(foundCandy);
    })
    .catch(next);
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
        include: [Category]
      })
    })
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
      return Candy.findOne({
        where: {
          id: updatedCandy[0].id
        },
        include: [Category]
      })
    })
    .then(foundCandy => {
      res.status(200).json(foundCandy);
    })
    .catch(next);
})

// router.put('/:id/changeCategory', (req, res, next) => {
//   let categoriesId = req.body.categories;
//   Candy.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: {
//       model: Category,
//       through: CandyCategory
//     }
//   })
//     .then(foundCandy => {
//       candy = foundCandy;
//       return candy.setCategories(categoriesId);
//     })
//     .then(() => {
//       return Candy.findOne({
//         where: {
//           id: req.params.id
//         },
//         include: {
//           model: Category,
//           through: CandyCategory
//         }
//       })
//     })
//     .then(foundCandy => {
//       res.json(foundCandy);
//     })
//     .catch(next);
// })

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