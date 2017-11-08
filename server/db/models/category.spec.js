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
      it('should have a name', () =>{
        expect(softCandy.name).to.equal('Healthy Candy')
      })
      it('should have a description', () =>{
        expect(softCandy.description).to.equal('blah')
      })
      it('should have a image', () =>{
        expect(softCandy.image).to.equal('google.com')
      })
      it('should have an automatic id', () =>{
        expect(softCandy.id).to.not.equal(undefined || null)
      })

    })
  })
})
