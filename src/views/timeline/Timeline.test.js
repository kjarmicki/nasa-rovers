import React from 'react';
import { shallow } from 'enzyme';
import { Timeline } from './Timeline';

describe('The Timeline component', () => {
  it("should be able to pass it's bounds to children", () => {
    // given
    const rovers = [
      {
        id: 1,
        landing_date: '2012-04-06',
        max_date: '2016-05-08',
      },
      {
        id: 2,
        landing_date: '2011-05-03',
        max_date: '2013-09-10',
      },
    ];
    const expectedMinBound = Date.parse(rovers[1].landing_date);
    const expectedMaxBound = Date.parse(rovers[0].max_date);

    // when
    const component = shallow(<Timeline rovers={rovers} />);
    const Rovers = component.find('Rover');

    // then
    expect(Rovers.at(0)).toHaveProp('bounds', { min: expectedMinBound, max: expectedMaxBound });
    expect(Rovers.at(1)).toHaveProp('bounds', { min: expectedMinBound, max: expectedMaxBound });
  });
});
