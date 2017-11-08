/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    const password = 'superHashedPassword'
    const salt = 'superSecretSalt'
    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: password,
        salt: salt
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
    it('does not return the password or salt', () => {
      return request(app)
      .get('/api/users')
      .expect(200)
      .then(res => {
        expect(res.body[0].password).to.be.equal(undefined)
        expect(res.body[0].salt).to.be.equal(undefined)
      })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
