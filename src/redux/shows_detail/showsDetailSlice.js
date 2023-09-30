import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  show: null,
  seasons: [],
  status: 'idle',
  error: null,
};

export const fetchShowDetails = createAsyncThunk('showDetails/fetchShowDetails', async (showId) => {
  try {
    const showResponse = await fetch(`https://api.tvmaze.com/shows/${showId}`);
    const seasonsResponse = await fetch(`https://api.tvmaze.com/shows/${showId}/seasons`);

    if (!showResponse.ok || !seasonsResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const showData = await showResponse.json();
    const seasonsData = await seasonsResponse.json();

    return {
      show: showData,
      seasons: seasonsData,
    };
  } catch (error) {
    throw new Error(`Error fetching show details: ${error.message}`);
  }
});

const showDetailsSlice = createSlice({
  name: 'showDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShowDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.show = action.payload.show;
        state.seasons = action.payload.seasons;
      })
      .addCase(fetchShowDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default showDetailsSlice.reducer;

export const selectShowDetails = (state) => state.showDetails.show;
export const selectSeasons = (state) => state.showDetails.seasons;
export const selectShowDetailsStatus = (state) => state.showDetails.status;
export const selectShowDetailsError = (state) => state.showDetails.error;
