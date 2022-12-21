import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// this eliminate the need of provider
export const wrapper = createWrapper<AppStore>(makeStore);
