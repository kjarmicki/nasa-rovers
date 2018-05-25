import { SET_PHOTOS } from '../actions';

export default function roverPhotos(state = {}, action = {}) {
  switch (action.type) {
    case SET_PHOTOS:
      return Object.assign({}, state, {
        [action.roverName]: action.photos,
      });
    default:
      return state;
  }
}
