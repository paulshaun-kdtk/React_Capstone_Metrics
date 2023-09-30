import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  episodes: [],
  status: 'idle',
  error: null,
};

export const fetchEpisodes = createAsyncThunk('episodes/fetchEpisodes', async (showId) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching episodes: ${error.message}`);
  }
});

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.episodes = action.payload;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default episodesSlice.reducer;

export const selectEpisodes = (state) => state.episodes.episodes;
export const selectEpisodesStatus = (state) => state.episodes.status;
export const selectEpisodesError = (state) => state.episodes.error;
