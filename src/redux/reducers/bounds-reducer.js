import { SET_BOUNDS } from '../actions';

export default function bounds(state = {
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
