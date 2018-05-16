import React from 'react';
import Image from './Image';

export default function Gallery(props) {
  return (props.photos && props.photos.length > 0) ? (
    <div className="gallery">
      <h2>{props.roverName}</h2>
      <ul className="gallery-images">
        {props.photos.map(photo => <li key={photo.id}><Image {...photo} /></li>) }
      </ul>
    </div>
  ) : null;
}
