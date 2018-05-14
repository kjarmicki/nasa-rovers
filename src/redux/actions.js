export const SET_ROVERS = 'SET_ROVERS';
export const SET_BOUNDS = 'SET_BOUNDS';
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
  return async (dispatch, setState, { roversRepository }) => {
    const rovers = await roversRepository.getAll();
    const bounds = calculateBounds(rovers);
    dispatch({
      type: SET_BOUNDS,
      bounds,
    });
    dispatch({
      type: SET_ROVERS,
      rovers,
    });
  };
}

export function chooseTime(offsetForChosen) {
  return {
    type: CHOOSE_TIME,
    offsetForChosen,
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
