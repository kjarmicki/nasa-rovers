import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';

const EXAMPLE_PHOTOS = [
  {
    id: 1,
    data: 'passed',
  },
  {
    id: 2,
    data: 'passed',
  },
];

describe('The Gallery component', () => {
  it('should be able to render gallery title based on rover name', () => {
    // given
    const roverName = 'Rover-1';

    // when
    const component = shallow(<Gallery roverName={roverName} photos={EXAMPLE_PHOTOS} />);

    // then
    expect(component.find('h2')).toHaveText(roverName);
  });

  it('should be able to render gallery images', () => {
    // given
    const roverName = 'Rover-1';

    // when
    const component = shallow(<Gallery roverName={roverName} photos={EXAMPLE_PHOTOS} />);
    const images = component.find('Image');
    const image1 = images.at(0);
    const image2 = images.at(1);

    // then
    expect(image1).toHaveProp('data', EXAMPLE_PHOTOS[0].data);
    expect(image2).toHaveProp('data', EXAMPLE_PHOTOS[1].data);
  });
});
