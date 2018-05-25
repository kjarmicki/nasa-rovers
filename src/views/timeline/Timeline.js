import React, { Component } from 'react';
import { arrayOf, shape, object, func, number, string } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { daysToMiliseconds, msToReadableDate } from '../../utils/time';
import * as actions from '../../redux/actions';
import Rover from './Rover';
import Indicator from './Indicator';
import './Timeline.css';

export class Timeline extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.actions = props.actions || actions;
  }
  hasRovers() {
    return this.props.rovers.length > 0;
  }
  onClick(event) {
    this.props.dispatch(
      this.actions.chooseTimeWithPhotos(
        this.timeFromEvent(event), this.props.photosLimit));
  }
  onMouseMove(event) {
    this.props.dispatch(this.actions.hoverOverTime(this.timeFromEvent(event)));
  }
  onMouseLeave() {
    this.props.dispatch(this.actions.stopHoveringOverTime());
  }
  timeFromEvent(event) {
    const { bounds } = this.props;
    const proportion = (event.clientX - event.currentTarget.offsetLeft)
      / event.currentTarget.clientWidth;
    const spectrum = bounds.max - (bounds.min - daysToMiliseconds(1));
    return spectrum * proportion;
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
    const { bounds, time: { offsetForHovering, offsetForChosen } } = this.props;
    const timelineClassName = classNames('timeline', { 'is-loading': !this.hasRovers() });
    return (
      <div
        className={timelineClassName}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
        >
        {this.props.rovers.map(roverData =>
          <Rover key={roverData.id} {...roverData} />)}
        <div className="timeline-ruler">
          {Timeline.createRulerMarks(10)}
          {Timeline.createRulerBounds(bounds)}
        </div>
        {offsetForChosen && <Indicator offset={offsetForChosen} />}
        {offsetForHovering && <Indicator offset={offsetForHovering} />}
      </div>
    );
  }
}

Timeline.propTypes = {
  rovers: arrayOf(shape({
    id: number.isRequired,
    landing_date: string.isRequired,
    max_date: string.isRequired,
  })),
  time: shape({
    offsetForHovering: number,
    offsetForChosen: number,
  }),
  bounds: shape({
    min: number,
    max: number,
  }),
  dispatch: func.isRequired,
  actions: object,
  photosLimit: number,
};

Timeline.defaultProps = {
  rovers: [],
  time: {
    offsetForHovering: undefined,
    offsetForChosen: undefined,
  },
  dispatch: () => {},
  bounds: {
    min: undefined,
    max: undefined,
  },
  photosLimit: 10,
};

export default connect(state => ({
  rovers: state.rovers,
  time: state.time,
  bounds: state.bounds,
}))(Timeline);
