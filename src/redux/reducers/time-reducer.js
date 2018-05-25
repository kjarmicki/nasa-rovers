import { CHOOSE_TIME, HOVER_OVER_TIME, STOP_HOVERING_OVER_TIME } from '../actions';

export default function time(state = {
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
