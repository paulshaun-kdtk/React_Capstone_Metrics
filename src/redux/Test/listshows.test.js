import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import showReducer, { fetchShows } from '../shows_list/listShowsSlice';

// Create a mock Redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('showSlice', () => {
  it('should return the initial state', () => {
    const initialState = {
      shows: [],
      status: 'idle',
      error: null,
    };
    expect(showReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchShows.pending', () => {
    const initialState = {
      shows: [],
      status: 'idle',
      error: null,
    };

    const store = mockStore(initialState);

    store.dispatch(fetchShows());
    const actions = store.getActions();

    const expectedState = {
      ...initialState,
      status: 'loading',
    };

    expect(showReducer(initialState, actions[0])).toEqual(expectedState);
  });

});
