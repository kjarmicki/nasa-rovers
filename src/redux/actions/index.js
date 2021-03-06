import { msToReadableDate } from '../../utils/time';

export const SET_ROVERS = 'SET_ROVERS';
export const SET_BOUNDS = 'SET_BOUNDS';
export const SET_PHOTOS = 'SET_PHOTOS';
export const CRITICAL_ERROR = 'CRITICAL_ERROR';
export const CHOOSE_TIME = 'CHOOSE_TIME';
export const HOVER_OVER_TIME = 'HOVER_OVER_TIME';
export const STOP_HOVERING_OVER_TIME = 'STOP_HOVERING_OVER_TIME';

function calculateBounds(rovers) {
  return rovers.reduce((bounds, rover) => {
    const landingTimestamp = Date.parse(rover.landing_date);
    const maxDateTimestamp = Date.parse(rover.max_date);
    bounds.min = bounds.min === undefined ?
      landingTimestamp : Math.min(bounds.min, landingTimestamp);
    bounds.max = bounds.max === undefined ?
      maxDateTimestamp : Math.max(bounds.max, maxDateTimestamp);
    return bounds;
  }, { min: undefined, max: undefined });
}

export function initRovers() {
  return async (dispatch, getState, { roversRepository }) => {
    let rovers;
    try {
      rovers = await roversRepository.getAll();
    } catch (error) {
      return dispatch({
        type: CRITICAL_ERROR,
        error,
      });
    }
    const bounds = calculateBounds(rovers);
    dispatch({
      type: SET_BOUNDS,
      bounds,
    });
    return dispatch({
      type: SET_ROVERS,
      rovers,
    });
  };
}

export function chooseTimeWithPhotos(offsetForChosen, limit) {
  return async (dispatch, getState, { photosRepository }) => {
    dispatch({
      type: CHOOSE_TIME,
      offsetForChosen,
    });
    const msDate = getState().bounds.min + offsetForChosen;
    const earthDate = msToReadableDate(msDate);
    const fetchingPhotosForAllRovers = getState().rovers.map(rover => rover.name)
      .map(roverName => photosRepository.getByRoverAndEarthDate(roverName, earthDate, { limit })
        .then((photos) => {
          dispatch({
            type: SET_PHOTOS,
            roverName,
            photos,
          });
        }));
    try {
      return await Promise.all(fetchingPhotosForAllRovers);
    } catch (error) {
      return dispatch({
        type: CRITICAL_ERROR,
        error,
      });
    }
  };
}

export function hoverOverTime(offsetForHovering) {
  return {
    type: HOVER_OVER_TIME,
    offsetForHovering,
  };
}

export function stopHoveringOverTime() {
  return {
    type: STOP_HOVERING_OVER_TIME,
  };
}
