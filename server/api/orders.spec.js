'use strict';

const {expect} = require('chai');
const request = require('supertest');
const app = require('../index.js');
const db = require('../db');
const Order = require('../db/models/order');
const Candy = require('../db/models/candy');

describe('Orders Route:', function() {

  before(function () {
    return db.sync({force: true});
  });

  describe('GET /orders', () => {
    it('responds with an array via JSON', () => {
      return request(app)
      .get('/api/orders')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length(0);
      });
    });
  });
});
