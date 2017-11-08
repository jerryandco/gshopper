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
      let candies = [
        {
          name: 'Crazy drops',
          price: '2'
        },
        {
          name: 'Rabbolicious',
          price: '3'
        },
        {
          name: 'Sweet things',
          price: '2'
        }
      ];
      let createdCandies;
      beforeEach(() => {
        Candy.bulkCreate(candies).then(createdCandy => {
          createdCandies = createdCandy;
        });
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
      it('should have a default image', () => {
        expect(cavendishDrops.image).to.equal(
          'http://s7.orientaltrading.com/is/image/OrientalTrading/candy-candycanes-110216-1x1?$NOWA$&$1X1Main$&'
        );
      });
      it('should have a default quantity of 0', () => {
        expect(cavendishDrops.quantity).to.equal(0);
      });
      it('created multiple candies', () => {
        expect(createdCandies.length).to.equal(3);
      });
    });
  });
});
