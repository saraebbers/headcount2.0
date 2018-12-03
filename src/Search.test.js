import React from 'react';
import Search from './Search';
import { shallow } from 'enzyme';

describe('Search', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<Search searchForDistrict={()=> {}} />);
    expect(wrapper).toMatchSnapshot()
  });


})