import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'ro-RO',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    switchLanguage(state, action) {
      console.log(action);
      return {
        language: action.payload,
      };
    },
  },
});

export const languageActions = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
