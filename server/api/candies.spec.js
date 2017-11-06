const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Candy = db.model('candy')

describe('Candy routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/candies', () => {
    const candyName = 'Coca cola lollipop'

    beforeEach(() => {
      return Candy.create({
        name: "Coca cola lollipop",
        quantity: 34,
        price: 4
      })
    })

    it('GET /api/candies', () => {
      return request(app)
        .get('/api/candies')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(candyName)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
