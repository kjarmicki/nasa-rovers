import React from 'react';
import { shallow } from 'enzyme';
import { Galleries } from './Galleries';

describe('The Galleries component', () => {
  it('should be able to render individual galleries based on rover photos', () => {
    // given
    const roverName1 = 'Rover-1';
    const roverName2 = 'Rover-2';
    const roverPhotos = {
      [roverName1]: [{ a: 'b' }],
      [roverName2]: [{ c: 'd' }],
    };

    // when
    const component = shallow(<Galleries roverPhotos={roverPhotos} />);
    const galleries = component.find('Gallery');
    const gallery1 = galleries.at(0);
    const gallery2 = galleries.at(1);

    // then
    expect(gallery1).toHaveProp('roverName', roverName1);
    expect(gallery1).toHaveProp('photos', roverPhotos[roverName1]);
    expect(gallery2).toHaveProp('roverName', roverName2);
    expect(gallery2).toHaveProp('photos', roverPhotos[roverName2]);
  });
});
