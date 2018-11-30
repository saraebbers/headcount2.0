import React from 'react';
import CardContainer from './CardContainer';
import { shallow } from 'enzyme';

describe('CardContainer'), () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<CardContainer 
          displayData={ mockdisplayData }/>)
    expect(wrapper).toMatchSnapshot()
  });

  it('renders all the cards', () => {
    const wrapper = shallow(<CardContainer
        displayData={ mockdisplayData }
          />)
    const mockDisplayData = [{location: NorthCarolina, 
      stats: [{1999: 0.007}, {2099: 1.999}]
    }, {location: VIRGINIA, stats: [{1909: 0.107}, {3999: 5.999}]]

  })

}