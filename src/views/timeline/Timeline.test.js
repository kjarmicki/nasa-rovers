import React from 'react';
import { shallow } from 'enzyme';
import { Timeline } from './Timeline';

const EXAMPLE_ROVERS = [
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
const EXAMPLE_BOUNDS = {
  min: Date.parse(EXAMPLE_ROVERS[1].landing_date),
  max: Date.parse(EXAMPLE_ROVERS[0].max_date),
};

describe('The Timeline component', () => {
  it('should render timeline bound dates correctly', () => {
    // when
    const component = shallow(<Timeline bounds={EXAMPLE_BOUNDS} />);
    const lowerBound = component.find('.timeline-ruler-lower-bound');
    const upperBound = component.find('.timeline-ruler-upper-bound');

    // then
    expect(lowerBound).toHaveText('2011-05-03');
    expect(upperBound).toHaveText('2016-05-08');
  });

  it('should call appropriate function on mouse move', () => {
    // when
    const onHoverOverTime = jest.fn();
    const component = shallow(
      <Timeline bounds={EXAMPLE_BOUNDS} onHoverOverTime={onHoverOverTime} />);
    component.find('.timeline').simulate('mousemove', {
      clientX: 100,
      currentTarget: {
        clientWidth: 200,
        offsetLeft: 0,
      },
    });

    // then
    expect(onHoverOverTime).toHaveBeenCalledWith(79185600000);
    expect(onHoverOverTime).toHaveBeenCalledTimes(1);
  });

  it('should call appropriate function on mouse click', () => {
    // given
    const onTimeChosen = jest.fn();

    // when
    const component = shallow(
      <Timeline bounds={EXAMPLE_BOUNDS} onTimeChosen={onTimeChosen} photosLimit={8} />);
    component.find('.timeline').simulate('click', {
      clientX: 100,
      currentTarget: {
        clientWidth: 200,
        offsetLeft: 0,
      },
    });

    // then
    expect(onTimeChosen).toHaveBeenCalledWith(79185600000, 8);
    expect(onTimeChosen).toHaveBeenCalledTimes(1);
  });

  it('should call appropriate function on mouse leave', () => {
    // when
    const onStopHoveringOverTime = jest.fn();
    const component = shallow(
      <Timeline bounds={EXAMPLE_BOUNDS} onStopHoveringOverTime={onStopHoveringOverTime} />);
    component.find('.timeline').simulate('mouseleave');

    // then
    expect(onStopHoveringOverTime).toHaveBeenCalledTimes(1);
  });
});
