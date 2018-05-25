import { SET_ROVERS } from '../actions';

export default function rovers(state = [], action = {}) {
  switch (action.type) {
    case SET_ROVERS:
      return action.rovers;
    default:
      return state;
  }
}
