import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  show: null,
  seasons: [],
  status: 'idle',
  error: null,
};

export const fetchShowDetails = createAsyncThunk('showDetails/fetchShowDetails', async (showId) => {
  const showResponse = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
  const seasonsResponse = await axios.get(`https://api.tvmaze.com/shows/${showId}/seasons`);
  return {
    show: showResponse.data,
    seasons: seasonsResponse.data,
  };
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
