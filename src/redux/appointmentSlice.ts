import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentState {
  time: string;
  price: string;
  staff: string;
  centerID: string;
  center: string;
  address: string;
}

interface UpdateAppointmentState {
  time?: string;
  price?: string;
  staff?: string;
  center?: string;
  centerID?: string;
  address?: string;
}

const initialState: AppointmentState = {
  time: '',
  price: '',
  staff: '',
  center: '',
  centerID: '',
  address: '',
};

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointemnt: (state, action: PayloadAction<AppointmentState>) =>
      (state = action.payload),
    updateAppointment: (state, action: PayloadAction<UpdateAppointmentState>) =>
      (state = { ...state, ...action.payload }),
  },
});

export const { addAppointemnt, updateAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
