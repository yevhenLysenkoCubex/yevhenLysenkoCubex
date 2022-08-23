import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QueryState {
  test: string;
  testID: string;
  destination: string;
  date: string;
  answers: string[];
  suggested: null | string;
}

const initialState: QueryState = {
  test: '',
  testID: '',
  destination: '',
  date: '',
  answers: [],
  suggested: null,
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    createQuery: (state, action: PayloadAction<QueryState>) =>
      (state = action.payload),
    updateQuery: (state, action: PayloadAction<any>) => {
      state.date = action.payload;
    },
  },
});

export const { createQuery, updateQuery } = querySlice.actions;

export default querySlice.reducer;
