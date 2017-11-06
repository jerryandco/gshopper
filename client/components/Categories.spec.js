import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Categories} from './Categories'
import Filter from './Filter.jsx'
const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllCategories', () => {
  let allCats
  const dumbCats = [{}, {}, {}]

  beforeEach(() => {
    allCats = shallow(<Categories categories={dumbCats} />)
  })

  it('is using the filter component', () => {
    expect(allCats.contains(<Filter type={'category'} />));
  })

})
