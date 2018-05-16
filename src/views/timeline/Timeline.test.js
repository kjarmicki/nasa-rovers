import React from 'react';
import { shallow } from 'enzyme';
import { Timeline } from './Timeline';
import * as actions from '../../redux/actions';

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

  it('should dispatch appropriate action on mouse move', () => {
    // when
    const dispatch = jest.fn();
    const component = shallow(<Timeline bounds={EXAMPLE_BOUNDS} dispatch={dispatch} />);
    component.find('.timeline').simulate('mousemove', {
      clientX: 100,
      currentTarget: {
        clientWidth: 200,
      },
    });

    // then
    expect(dispatch).toHaveBeenCalledWith({
      type: actions.HOVER_OVER_TIME,
      offsetForHovering: 79185600000,
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch appropriate action on mouse click', () => {
    // given
    const dispatch = jest.fn();
    const ctwpReturnValue = Symbol('chooseTimeWithPhotos return value');
    const ctwpMock = jest.fn(() => ctwpReturnValue);
    const mockedActions = {
      chooseTimeWithPhotos: ctwpMock,
    };

    // when
    const component = shallow(<Timeline
      bounds={EXAMPLE_BOUNDS}
      dispatch={dispatch}
      actions={mockedActions}
    />);
    component.find('.timeline').simulate('click', {
      clientX: 100,
      currentTarget: {
        clientWidth: 200,
      },
    });

    // then
    expect(dispatch).toHaveBeenCalledWith(ctwpReturnValue);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(ctwpMock).toHaveBeenCalledTimes(1);
  });

  it('should dispatch appropriate action on mouse leave', () => {
    // when
    const dispatch = jest.fn();
    const component = shallow(<Timeline bounds={EXAMPLE_BOUNDS} dispatch={dispatch} />);
    component.find('.timeline').simulate('mouseleave');

    // then
    expect(dispatch).toHaveBeenCalledWith({
      type: actions.STOP_HOVERING_OVER_TIME,
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
