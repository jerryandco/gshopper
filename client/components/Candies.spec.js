/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Candies} from './Candies.jsx';
import Filter from './Filter.jsx'

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Candies', () => {
  let candies;
  const allCandies = [
    { name: 'cavendish drops' },
    { name: 'chocolate somethings' },
    { name: 'jellybeans' }
  ];

  beforeEach(() => {
    candies = shallow(<Candies allCandies={allCandies} />);
  });

  it('renders a single div containing all the data', () => {
    expect(candies.type()).to.equal('div');
  });

  it('uses the Filter component to render candy', () => {
    expect(candies.contains(<Filter type={'candy'} />)).to.equal(true);
  });
});
