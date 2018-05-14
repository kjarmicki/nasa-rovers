import * as actions from './actions';

const EXAMPLE_ROVERS = [
  {
    id: 1,
    landing_date: '2012-04-06',
    max_date: '2016-05-08',
  },
  {
    id: 2,
    landing_date: '2011-05-03',
    max_date: '2013-09-10',
  },
];

describe('Redux actions', () => {
  describe('for rovers', () => {
    it('should make it possible to initialize rovers', async () => {
      // given
      const dispatch = jest.fn();
      const mockedRepository = {
        async getAll() {
          return EXAMPLE_ROVERS;
        },
      };
      const expectedMinBound = Date.parse(EXAMPLE_ROVERS[1].landing_date);
      const expectedMaxBound = Date.parse(EXAMPLE_ROVERS[0].max_date);

      // when
      const action = actions.initRovers();
      await action(dispatch, jest.fn(), { roversRepository: mockedRepository });

      // then
      expect(dispatch).toBeCalledWith({
        type: actions.SET_ROVERS,
        rovers: EXAMPLE_ROVERS,
      });
      expect(dispatch).toBeCalledWith({
        type: actions.SET_BOUNDS,
        bounds: {
          min: expectedMinBound,
          max: expectedMaxBound,
        },
      });
    });
  });
});
