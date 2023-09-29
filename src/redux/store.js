// store.js
import { configureStore } from '@reduxjs/toolkit';
import showSlice from './shows_list/listShowsSlice';
import showDetailsSlice from './shows_detail/showsDetailSlice';
import episodesSlice from './shows_detail/episodesSlice';

const store = configureStore({
  reducer: {
    shows: showSlice,
    episodes: episodesSlice,
    showDetails: showDetailsSlice,
  },
});

export default store;
