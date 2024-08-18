import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string
  isAuthenticated: boolean
}

export const initialState: AuthState = {
  token: '',
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token
      state.isAuthenticated = action.payload.isAuthenticated
    },
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.token = ''
      state.isAuthenticated = false
    },
  },
})

export const { setAuthState, login, logout } = authSlice.actions
export default authSlice.reducer