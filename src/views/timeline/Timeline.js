import React from 'react';
import { arrayOf, shape, number } from 'prop-types';
import Rover from './Rover';

export default function Timeline(props) {
  return (
        <div className="timeline">
            { props.rovers.map(roverData => <Rover key={roverData.id} {...roverData} />) }
        </div>
  );
}

Timeline.propTypes = {
  rovers: arrayOf(shape({
    id: number,
  })),
};
