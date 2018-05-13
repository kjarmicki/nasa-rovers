export const INIT_ROVERS = 'INIT_ROVERS';

export function initRovers() {
  return async (dispatch, setState, { roversRepository }) => {
    const rovers = await roversRepository.getAll();
    dispatch({
      type: INIT_ROVERS,
      rovers,
    });
  };
}
