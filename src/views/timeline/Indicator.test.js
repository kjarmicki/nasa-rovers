import React from 'react';
import { shallow } from 'enzyme';
import { Indicator } from './Indicator';

describe('The Indicator component', () => {
  it("should be able to calculate it's offset", () => {
    // given
    const bounds = {
      min: Date.parse('1970-01-02'),
      max: Date.parse('1970-01-03'),
    };
    const offset = 86400000;

    // when
    const component = shallow(<Indicator bounds={bounds} offset={offset} />);

    // then
    expect(component.find('.indicator')).toHaveStyle({ left: '50%' });
  });
});
