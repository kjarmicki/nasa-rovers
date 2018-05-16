import * as actions from './actions';

const EXAMPLE_ROVERS = [
  {
    id: 1,
    name: 'Rover-1',
    landing_date: '2012-04-06',
    max_date: '2016-05-08',
  },
  {
    id: 2,
    name: 'Rover-2',
    landing_date: '2011-05-03',
    max_date: '2013-09-10',
  },
];

const EXAMPLE_PHOTOS = {
  '2012-10-10': {
    'Rover-1': {
      id: 1,
    },
    'Rover-2': {
      id: 2,
    },
  },
};

describe.only('Redux actions', () => {
  describe('for rovers', () => {
    it('should make it possible to initialize rovers', async () => {
      // given
      const dispatch = jest.fn();
      const roversRepository = {
        async getAll() {
          return EXAMPLE_ROVERS;
        },
      };
      const expectedMinBound = Date.parse(EXAMPLE_ROVERS[1].landing_date);
      const expectedMaxBound = Date.parse(EXAMPLE_ROVERS[0].max_date);

      // when
      const action = actions.initRovers();
      await action(dispatch, jest.fn(), { roversRepository });

      // then
      expect(dispatch).toHaveBeenCalledWith({
        type: actions.SET_ROVERS,
        rovers: EXAMPLE_ROVERS,
      });
      expect(dispatch).toHaveBeenCalledWith({
        type: actions.SET_BOUNDS,
        bounds: {
          min: expectedMinBound,
          max: expectedMaxBound,
        },
      });
    });

    describe('for photos', () => {
      it('should make it possible to obtain photos for selected time offset', async () => {
        // given
        const dispatch = jest.fn();
        const getState = () => ({
          rovers: EXAMPLE_ROVERS,
          bounds: {
            min: Date.parse(EXAMPLE_ROVERS[1].landing_date),
            max: Date.parse(EXAMPLE_ROVERS[0].max_date),
          },
        });
        const photosRepository = {
          async getByRoverAndEarthDate(roverName, earthDate) {
            return EXAMPLE_PHOTOS[earthDate][roverName];
          },
        };
        const offsetForChosen = Date.parse(Object.keys(EXAMPLE_PHOTOS)[0]) - getState().bounds.min;

        // when
        const action = actions.chooseTimeWithPhotos(offsetForChosen);
        await action(dispatch, getState, { photosRepository });

        expect(dispatch).toHaveBeenCalledWith({
          type: actions.CHOOSE_TIME,
          offsetForChosen,
        });
      });
    });
  });
});
