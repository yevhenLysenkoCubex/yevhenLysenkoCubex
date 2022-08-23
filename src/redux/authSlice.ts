import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authOperations from './authOperations';

const initialState = {
  user: { firstName: '', lastName: '', email: '', phone: '' },
  token: null,
  isLoggedIn: false,
  error: null,
  isEmailVerified: false,
  chosenFlow: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    chooseFlow: (state, action: PayloadAction<any>) => {
      state.chosenFlow = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(authOperations.signup.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(authOperations.signin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = state.chosenFlow === 'guest' ? false : true;
      state.isEmailVerified = true;
    });
    builder.addCase(
      authOperations.signInWithGoogle.fulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isEmailVerified = true;
      },
    );
    builder.addCase(authOperations.signout.fulfilled, (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
    });
    builder.addCase(authOperations.verifyEmail.fulfilled, (state, action) => {
      state.user.email = action.payload.email;
    });
    // builder.addCase(authOperations.signup.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
    // builder.addCase(authOperations.signin.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
    // builder.addCase(authOperations.signout.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

export const { chooseFlow } = authSlice.actions;

export default authSlice.reducer;
