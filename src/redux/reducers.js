import { combineReducers } from 'redux';
import { INIT_ROVERS } from './actions';

function rovers(state = [], action = {}) {
  switch (action.type) {
    case INIT_ROVERS:
      return action.rovers;
    default:
      return state;
  }
}

export default combineReducers({
  rovers,
});
