import React from 'react';
import { shallow } from 'enzyme';
import Rover from './Rover';

describe('The Rover component', () => {
  it("should be able to place it's time on the timeline", () => {
    // given
    const roverProps = {
      name: 'Rov',
      landing_date: '2012-01-02',
      max_date: '2012-01-04',
      bounds: {
        min: Date.parse('2012-01-01'),
        max: Date.parse('2012-01-04'),
      },
    };

    // when
    const component = shallow(<Rover {...roverProps} />);
    const filledTime = component.find('.rover-time-filled');

    // then
    expect(filledTime).toHaveStyle('marginLeft', '25%');
    expect(filledTime).toHaveStyle('width', '50%');
  });
});
