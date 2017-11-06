/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Candy = db.model('candy');

describe('Candy model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('model definitions', () => {
    describe('Candy model', () => {
      let cavendishDrops;

      beforeEach(() => {
        return Candy.create({
          name: 'Cavendish Drops',
          price: '2'
        }).then(candy => {
          cavendishDrops = candy;
        });
      });

      it('should be an instance of Candy', () => {
        expect(cavendishDrops).to.be.an.instanceOf(Candy);
      });

      it('should have a name value of Cavendish Drops ', () => {
        expect(cavendishDrops.name).to.equal('Cavendish Drops');
      });
    });
  });
});
