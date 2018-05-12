import React from 'react';
import Rover from './Rover';

export default function Timeline(props) {
    return(
        <div className="timeline">
            { props.rovers.map(roverData => <Rover key={roverData.id} {...roverData} />) }
        </div>
    );
}