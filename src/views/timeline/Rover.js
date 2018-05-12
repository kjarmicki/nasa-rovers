import React from 'react';
import { string } from 'prop-types';

export default function Rover(props) {
  return (
        <div className="rover">{props.name}</div>
  );
}

Rover.propTypes = {
  name: string,
};
