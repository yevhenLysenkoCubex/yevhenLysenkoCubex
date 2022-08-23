import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://one-check-auth-staging.herokuapp.com';
const setToken = (token: string) =>
  (axios.defaults.headers.common.Authorization = `Bearer ${token}`);
const unsetToken = () => (axios.defaults.headers.common.Authorization = '');

const setGoogleToken = (token: string) =>
  (axios.defaults.headers.common.GAuthorization = `Bearer ${token}`);

// Make services folder plus funcs to execute reqs
// Store may be imported as file to Axios Interceptor to get curr token

const signup = createAsyncThunk('user/signup', async (payload: any) => {
  try {
    await axios.post('/user', payload);
    const { role, password, ...data } = payload;

    const email = payload.email;
    await axios.post('/login/init', { email });

    return data;
  } catch (error: any) {
    return error.message;
  }
});

const verifyEmail = createAsyncThunk('user/email', async (payload: any) => {
  try {
    await axios.post('/login/init', payload);
    return payload;
  } catch (error: any) {
    return error.message;
  }
});

const signin = createAsyncThunk(
  'user/signin',
  async (payload: any, thunkApi: any) => {
    try {
      const state = thunkApi.getState();
      const flow = state.auth.chosenFlow;

      const { navigate, ...rest } = payload;
      const { data } = await axios.post('/login', rest);
      setToken(data.access_token);
      // Axios Interceptor
      // secure https cookies ??
      const { data: user } = await axios.get('/user');
      if (flow === 'guest') {
        navigate('/payment');
      } else {
        navigate('/belonging');
      }

      return { token: data.access_token, user };
    } catch (error: any) {
      return error.message;
    }
  },
);

const signInWithGoogle = createAsyncThunk(
  'user/signin/google',
  async (payload: any) => {
    try {
      const { credential, navigate } = payload;
      setGoogleToken(credential);
      const { data } = await axios.post('/login/google');
      setToken(data.access_token);

      const { data: user } = await axios.get('/user');
      navigate('/belonging');
      return { user, token: data.refresh_token };
    } catch (error: any) {
      console.log(error.message);
      return error.message;
    }
  },
);

const signout = createAsyncThunk('user/signout', async () => {
  try {
    await axios.get('/logout');
    unsetToken();
  } catch (error: any) {
    return error.message;
  }
});

const authOperations = {
  signup,
  signin,
  signout,
  verifyEmail,
  signInWithGoogle,
};

export default authOperations;
