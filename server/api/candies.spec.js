const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Candy = db.model('candy');
const Categories = db.model('category');

describe('Candy routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/candies', () => {
    const candyName = 'Coca cola lollipop';

    beforeEach(() => {
      Candy.create({
        name: 'Coca cola lollipop',
        quantity: 34,
        price: 4
      });
      Categories.create({
        description: 'wow, wow, omg wow',
        name: 'Turtles'
      });
    });

    it('GET /api/candies', () => {
      return request(app)
        .get('/api/candies')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(candyName);
        });
    });
    it('POST /api/candies', () => {
      return request(app)
        .post('/api/candies')
        .send({
          candy: {
            name: 'Rock Soup',
            quantity: 343,
            price: 34.4
          },
          categories: [1]
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal('Rock Soup');
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
