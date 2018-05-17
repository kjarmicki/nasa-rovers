import React from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import Image from './Image';
import './Gallery.css';

export default function Gallery(props) {
  return (props.photos && props.photos.length > 0) ? (
    <div className="gallery">
      <h2>Photos taken by {props.roverName}</h2>
      <ul className="gallery-images">
        {props.photos.map(photo => <li key={photo.id}><Image {...photo} /></li>) }
      </ul>
    </div>
  ) : null;
}

Gallery.propTypes = {
  roverName: string,
  photos: arrayOf(shape({
    id: number,
  })),
};
