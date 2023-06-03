import { configureStore } from '@reduxjs/toolkit';
import { accountReducer } from './reducers/account';
import { languageReducer } from '@/store/reducers/language';

const store = configureStore({
  reducer: {
    account: accountReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
