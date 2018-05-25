import { combineReducers } from 'redux';
import rovers from './rovers-reducer';
import bounds from './bounds-reducer';
import time from './time-reducer';
import roverPhotos from './rover-photos-reducer';
import stability from './stability-reducer';

export default combineReducers({
  rovers,
  bounds,
  time,
  roverPhotos,
  stability,
});
