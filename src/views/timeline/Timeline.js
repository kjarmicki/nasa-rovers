import React, { PureComponent } from 'react';
import { arrayOf, shape, number, string } from 'prop-types';
import { connect } from 'react-redux';
import Rover from './Rover';

export class Timeline extends PureComponent {
  calculateBounds() {
    return this.props.rovers.reduce((bounds, rover) => {
      const landingTimestamp = Date.parse(rover.landing_date);
      const maxDateTimestamp = Date.parse(rover.max_date);
      bounds.min = bounds.min === undefined ?
        landingTimestamp : Math.min(bounds.min, landingTimestamp);
      bounds.max = bounds.max === undefined ?
        maxDateTimestamp : Math.max(bounds.max, maxDateTimestamp);
      return bounds;
    }, { min: undefined, max: undefined });
  }
  render() {
    const bounds = this.calculateBounds();
    return (
      <div className="timeline">
        {this.props.rovers.map(roverData =>
          <Rover bounds={bounds} key={roverData.id} {...roverData} />)}
      </div>
    );
  }
}

Timeline.propTypes = {
  rovers: arrayOf(shape({
    id: number,
    landing_date: string,
    max_date: string,
  })),
};

export default connect(state => ({
  rovers: state.rovers,
}))(Timeline);
