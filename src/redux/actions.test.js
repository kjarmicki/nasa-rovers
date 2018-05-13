import * as actions from './actions';

describe('Redux actions', () => {
  describe('for rovers', () => {
    it('should make it possible to initialize rovers', async () => {
      // given
      const dispatch = jest.fn();
      const expectedRovers = [];
      const mockedRepository = {
        async getAll() {
          return expectedRovers;
        },
      };

      // when
      const action = actions.initRovers();
      await action(dispatch, jest.fn(), { roversRepository: mockedRepository });

      // then
      expect(dispatch).toBeCalledWith({
        type: actions.INIT_ROVERS,
        rovers: expectedRovers,
      });
    });
  });
});
