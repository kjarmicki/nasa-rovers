import React, { Component } from 'react';
import { string, shape, number } from 'prop-types';
import { connect } from 'react-redux';
import { daysToMiliseconds } from '../../utils/time';
import './Rover.css';

export class Rover extends Component {
  calculateTimePlacement() {
    const { min, max } = this.props.bounds;
    const spectrum = max - (min - daysToMiliseconds(1));
    const onePercentUnit = 100 / spectrum;
    const offset = Date.parse(this.props.landing_date) - min;
    const width = Date.parse(this.props.max_date) - min - offset;
    return {
      offsetPercent: offset * onePercentUnit,
      widthPercent: width * onePercentUnit,
    };
  }
  render() {
    const { offsetPercent, widthPercent } = this.calculateTimePlacement();
    const timeFilledStyle = {
      width: `${widthPercent}%`,
      marginLeft: `${offsetPercent}%`,
    };
    return (
      <div className="rover">
        <h2>{this.props.name}</h2>
        <div className="rover-time">
          <div className="rover-time-filled" style={timeFilledStyle}></div>
        </div>
      </div>
    );
  }
}

Rover.propTypes = {
  name: string,
  landing_date: string,
  max_date: string,
  bounds: shape({
    min: number,
    max: number,
  }),
};

export default connect(state => ({
  bounds: state.bounds,
}))(Rover);
