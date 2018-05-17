import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';

describe('The Image component', () => {
  it('should be able to render an image', () => {
    // given
    const imgSrc = 'https://example-url.com/img';

    // when
    const component = shallow(<Image img_src={imgSrc} />);

    // then
    expect(component.find('img').at(0)).toHaveProp('src', imgSrc);
  });
});

