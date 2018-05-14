import { combineReducers } from 'redux';
import { SET_ROVERS, SET_BOUNDS, CHOOSE_TIME, HOVER_OVER_TIME, STOP_HOVERING_OVER_TIME } from './actions';

function rovers(state = [], action = {}) {
  switch (action.type) {
    case SET_ROVERS:
      return action.rovers;
    default:
      return state;
  }
}

function bounds(state = {
  min: undefined,
  max: undefined,
}, action = {}) {
  switch (action.type) {
    case SET_BOUNDS:
      return action.bounds;
    default:
      return state;
  }
}

function time(state = {
  // all times in miliseconds
  // offset means that this time is relative to earliest rover time
  offsetForChosen: undefined,
  offsetForHovering: undefined,
}, action = {}) {
  switch (action.type) {
    case CHOOSE_TIME:
      return Object.assign({}, state, {
        offsetForChosen: action.offsetForChosen,
      });
    case HOVER_OVER_TIME:
      return Object.assign({}, state, {
        offsetForHovering: action.offsetForHovering,
      });
    case STOP_HOVERING_OVER_TIME:
      return Object.assign({}, state, {
        offsetForHovering: undefined,
      });
    default:
      return state;
  }
}

export default combineReducers({
  rovers,
  bounds,
  time,
});
