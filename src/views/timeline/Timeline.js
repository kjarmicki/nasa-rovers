import React, { PureComponent } from 'react';
import { arrayOf, shape, number, string } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Rover from './Rover';
import { msToReadableDate } from '../../utils/time';
import './Timeline.css';

export class Timeline extends PureComponent {
  hasRovers() {
    return this.props.rovers.length > 0;
  }
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
  static createRulerMarks(size) {
    return (
      <div className="timeline-ruler-marks">
        {
          Array.from({ length: size }).map((_, i) =>
            <div key={i} className="timeline-ruler-mark"></div>)
        }
      </div>
    );
  }
  static createRulerBounds(bounds) {
    return (
      <div className="timeline-ruler-bounds">
        <div className="timeline-ruler-lower-bound">{msToReadableDate(bounds.min)}</div>
        <div className="timeline-ruler-upper-bound">{msToReadableDate(bounds.max)}</div>
      </div>
    );
  }
  render() {
    const bounds = this.calculateBounds();
    const timelineClassName = classNames('timeline', { 'is-loading': !this.hasRovers() });
    return (
      <div className={timelineClassName}>
        {this.props.rovers.map(roverData =>
          <Rover bounds={bounds} key={roverData.id} {...roverData} />)}
        <div className="timeline-ruler">
          {Timeline.createRulerMarks(10)}
          {Timeline.createRulerBounds(bounds)}
        </div>
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
