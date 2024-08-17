import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/authSlice"

export const store = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
    }
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']