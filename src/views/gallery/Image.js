import React from 'react';
import { string } from 'prop-types';

export default function Image(props) {
  return (
    <div className="image">
      <img src={props.img_src} />
    </div>
  );
}

Image.propTypes = {
  img_src: string,
};
