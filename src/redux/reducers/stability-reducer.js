import { CRITICAL_ERROR } from '../actions';

export default function stability(state = {
  isStable: true,
}, action = {}) {
  switch (action.type) {
    case CRITICAL_ERROR:
      return {
        isStable: false,
        error: action.error,
      };
    default:
      return state;
  }
}
