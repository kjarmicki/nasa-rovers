import React, { PureComponent } from 'react';
import { arrayOf, shape, func, number, string } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { daysToMiliseconds, msToReadableDate } from '../../utils/time';
import * as actions from '../../redux/actions';
import Rover from './Rover';
import Indicator from './Indicator';
import './Timeline.css';

export class Timeline extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  hasRovers() {
    return this.props.rovers.length > 0;
  }
  onClick(event) {
    this.props.dispatch(actions.chooseTime(this.timeFromEvent(event)));
  }
  onMouseMove(event) {
    this.props.dispatch(actions.hoverOverTime(this.timeFromEvent(event)));
  }
  onMouseLeave() {
    this.props.dispatch(actions.stopHoveringOverTime());
  }
  timeFromEvent(event) {
    const { bounds } = this.props;
    const proportion = event.clientX / event.currentTarget.clientWidth;
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
        {offsetForHovering && <Indicator offset={offsetForHovering} />}
        {offsetForChosen && <Indicator offset={offsetForChosen} />}
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
  time: shape({
    offsetForHovering: number,
    offsetForChosen: number,
  }),
  bounds: shape({
    min: number,
    max: number,
  }),
  dispatch: func,
};

Timeline.defaultProps = {
  rovers: [],
  time: {
    offsetForHovering: undefined,
    offsetForChosen: undefined,
  },
  bounds: {
    min: undefined,
    max: undefined,
  },
};

export default connect(state => ({
  rovers: state.rovers,
  time: state.time,
  bounds: state.bounds,
}))(Timeline);
