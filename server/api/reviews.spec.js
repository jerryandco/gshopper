/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Review = db.model('review');

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/reviews/', () => {
    let review = 'this is great!';

    beforeEach(() => {
      return Review.create({
        review: review,
        stars: 5
      });
    });

    it('GET /api/reviews', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].review).to.be.equal(review);
          expect(res.body[0]).to.include({review: review, stars: 5});
        });
    });
  });
});
