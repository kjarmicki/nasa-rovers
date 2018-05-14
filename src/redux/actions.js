export const INIT_ROVERS = 'INIT_ROVERS';
export const CHOOSE_TIME = 'CHOOSE_TIME';
export const HOVER_OVER_TIME = 'HOVER_OVER_TIME';
export const STOP_HOVERING_OVER_TIME = 'STOP_HOVERING_OVER_TIME';

export function initRovers() {
  return async (dispatch, setState, { roversRepository }) => {
    const rovers = await roversRepository.getAll();
    dispatch({
      type: INIT_ROVERS,
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
