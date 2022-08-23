import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  isLoggedIn: boolean;
  name: string;
  surname: string;
  tel: string;
  mail: string;
  isMailVerified?: boolean;
}

const initialState: IUserState = {
  isLoggedIn: false,
  name: '',
  surname: '',
  tel: '',
  mail: '',
  isMailVerified: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<IUserState>) =>
      (state = action.payload),
    setIsUserLoggedIn: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { createUser, setIsUserLoggedIn } = userSlice.actions;

export default userSlice.reducer;
