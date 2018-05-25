import React from 'react';
import { shape, number } from 'prop-types';
import { connect } from 'react-redux';
import { daysToMiliseconds, msToReadableDate } from '../../utils/time';
import './Indicator.css';

export function Indicator(props) {
  const { min, max } = props.bounds;
  const spectrum = max - (min - daysToMiliseconds(1));
  const onePercentUnit = 100 / spectrum;
  const left = `${(props.offset * onePercentUnit)}%`;
  const date = msToReadableDate(min + props.offset);

  return (
    <div className="indicator" style={{ left }}>
      <div className="indicator-date">{date}</div>
    </div>
  );
}

Indicator.propTypes = {
  bounds: shape({
    min: number.isRequired,
    max: number.isRequired,
  }).isRequired,
  offset: number.isRequired,
};

export default connect(state => ({
  bounds: state.bounds,
}))(Indicator);
