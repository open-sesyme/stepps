import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: null,
  points: null,
  impression: null,
  message: '',
  createdBy: '',
  dateCreated: null,
  dateUpdated: null,
  recognitionList: [],
};

const recognitionSlice = createSlice({
  name: 'recognition',
  initialState,
  reducers: {
    setRecognitionData: (state, action) => {
      const { employee, points, impression, message, createdBy, dateCreated, dateUpdated } = action.payload;
      state.employee = employee;
      state.points = points;
      state.impression = impression;
      state.message = message;
      state.createdBy = createdBy;
      state.dateCreated = dateCreated;
      state.dateUpdated = dateUpdated;
    },
    clearRecognitionData: (state) => {
      state.employee = null;
      state.points = null;
      state.impression = null;
      state.message = '';
      state.createdBy = '';
      state.dateCreated = null;
      state.dateUpdated = null;
    },
    fetchRecognitionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecognitionSuccess: (state, action) => {
      state.loading = false;
      state.recognitionList = action.payload;
    },
    fetchRecognitionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  setRecognitionData,
  clearRecognitionData,
  fetchRecognitionStart,
  fetchRecognitionSuccess,
  fetchRecognitionFailure,
} = recognitionSlice.actions;

export default recognitionSlice.reducer;