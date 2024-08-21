import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  access_token: string;
  refresh_token: string;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  access_token: '',
  refresh_token: '',
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.isAuthenticated = action.payload.isAuthenticated
    },
    login: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload
      state.refresh_token = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.access_token = ''
      state.refresh_token = ''
      state.isAuthenticated = false
    },
  },
})

export const { setAuthState, login, logout } = authSlice.actions
export default authSlice.reducer