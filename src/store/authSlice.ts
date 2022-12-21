import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { ProfileStateType } from 'src/interfaces/user.types';

import { AppState } from '.';

export interface AuthState {
  state: boolean;
  profile: ProfileStateType;
}

const initialState: AuthState = {
  state: false,
  profile: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<ProfileStateType>) {
      state.profile = action.payload;
      state.state = action.payload.access_token != null;
    },
  },
  // special redurect for next wrapper
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice;
