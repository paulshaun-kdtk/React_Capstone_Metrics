import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import showDetailsReducer, { fetchShowDetails } from '../shows_detail/showsDetailSlice';

// Create a mock Redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('showDetailsSlice', () => {
  it('should return the initial state', () => {
    const initialState = {
      show: null,
      seasons: [],
      status: 'idle',
      error: null,
    };
    expect(showDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchShowDetails.pending', () => {
    const initialState = {
      show: null,
      seasons: [],
      status: 'idle',
      error: null,
    };

    const store = mockStore(initialState);

    store.dispatch(fetchShowDetails('showId'));
    const actions = store.getActions();

    const expectedState = {
      ...initialState,
      status: 'loading',
    };

    expect(showDetailsReducer(initialState, actions[0])).toEqual(expectedState);
  });


});
