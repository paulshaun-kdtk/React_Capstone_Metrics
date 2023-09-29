import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import episodesReducer, { fetchEpisodes } from '../shows_detail/episodesSlice';

// Create a mock Redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('episodesSlice', () => {
  it('should return the initial state', () => {
    const initialState = {
      episodes: [],
      status: 'idle',
      error: null,
    };
    expect(episodesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchEpisodes.pending', () => {
    const initialState = {
      episodes: [],
      status: 'idle',
      error: null,
    };

    const store = mockStore(initialState);

    store.dispatch(fetchEpisodes('showId'));
    const actions = store.getActions();

    const expectedState = {
      ...initialState,
      status: 'loading',
    };

    expect(episodesReducer(initialState, actions[0])).toEqual(expectedState);
  });

});
