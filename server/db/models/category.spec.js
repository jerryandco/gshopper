const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category');

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('model definitions', () => {
    describe('name field', () => {
      let softCandy

      beforeEach(() => {
        return Category.create({
          name: 'Healthy Candy',
          description: 'blah',
          image: 'google.com'
        }).then(category => {
          softCandy = category;
        });
      });
      it('should be an instance of Category', () => {
        expect(softCandy).to.be.an.instanceOf(Category);
      })

    })
  })
})
