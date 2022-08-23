import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeframe: {
    morning: false,
    afternoon: false,
    evening: false,
  },
  weekdays: {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
  },
  centers: {
    cdi: false,
    synlab: false,
    donato: false,
    appheal: false,
    bianalisi: false,
  },
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => (state = action.payload),
  },
});

export const { setFilter } = slice.actions;

export default slice.reducer;
