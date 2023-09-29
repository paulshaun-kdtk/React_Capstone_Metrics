import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  shows: [],
  status: 'idle',
  error: null,
};

export const fetchShows = createAsyncThunk('shows/fetchShows', async () => {
  const response = await axios.get('https://api.tvmaze.com/shows');
  return response.data;
});

const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shows = action.payload;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default showSlice.reducer;

export const selectAllShows = (state) => state.shows.shows;
export const selectShowsStatus = (state) => state.shows.status;
export const selectShowsError = (state) => state.shows.error;
