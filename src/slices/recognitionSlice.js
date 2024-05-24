import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: null,
  points: null,
  impression: null,
  message: '',
  dateCreate: null,
  dateUpdate: null,
};

const recognitionSlice = createSlice({
  name: 'recognition',
  initialState,
  reducers: {
    setRecognitionData: (state, action) => {
      const { employee, points, impression, message, dateCreate, dateUpdate } = action.payload;
      state.employee = employee;
      state.points = points;
      state.impression = impression;
      state.message = message;
      state.dateCreate = dateCreate;
      state.dateUpdate = dateUpdate;
    },
    clearRecognitionData: (state) => {
      state.employee = null;
      state.points = null;
      state.impression = null;
      state.message = '';
      state.dateCreate = null;
      state.dateUpdate = null;
    },
  },
});

export const { setRecognitionData, clearRecognitionData } = recognitionSlice.actions;

export default recognitionSlice.reducer;