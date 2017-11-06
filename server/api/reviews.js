const router = require('express').Router()
const { Review } = require('../db/models')

router.get('/', (req, res, next) => {
    Review.scope('populated').findAll()
        .then(allReview => {
            res.json(allReview);
        })
})

router.post('/', (req, res, next) => {
    Review.create(req.body)
        .then(createdReview => {
            return createdReview.reload(Review.options.scopes.populated());
        })
        .then(reloadReview => res.json(reloadReview))
        .catch(next);
})

router.delete('/:id', (req, res, next) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next);
})

module.exports = router;