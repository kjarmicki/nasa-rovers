import React from 'react';
import { shape, number } from 'prop-types';
import { connect } from 'react-redux';
import { daysToMiliseconds } from '../../utils/time';
import './Indicator.css';

export function Indicator(props) {
  const { min, max } = props.bounds;
  const spectrum = max - (min - daysToMiliseconds(1));
  const onePercentUnit = 100 / spectrum;
  const left = `${(props.offset * onePercentUnit)}%`;

  return (
    <div className="indicator" style={{ left }}></div>
  );
}

Indicator.propTypes = {
  bounds: shape({
    min: number,
    max: number,
  }),
  offset: number,
};

export default connect(state => ({
  bounds: state.bounds,
}))(Indicator);
