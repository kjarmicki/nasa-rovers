import React from 'react';
import { string } from 'prop-types';
import './Image.css';

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
