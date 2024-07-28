import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    isVisible: false,
    email: '',
    name: '',
    message: '',
    feedbackType: ''
  },
  reducers: {
    showFeedback: (state) => {
      state.isVisible = true;
    },
    hideFeedback: (state) => {
      state.isVisible = false;
    },
    setFeedbackData: (state, action) => {
        const { email, name, message, feedbackType } = action.payload;
        state.email = email;
        state.name = name;
        state.message = message;
        state.feedbackType = feedbackType;
    },
    clearFeedbackData: (state) => {
        state.email = '';
        state.name = '';
        state.message = '';
        state.feedbackType = '';
    }
  },
});

export const { showFeedback, hideFeedback, setFeedbackData, clearFeedbackData } = feedbackSlice.actions;
export const selectFeedbackVisibility = (state) => state.feedback.isVisible;
export default feedbackSlice.reducer;