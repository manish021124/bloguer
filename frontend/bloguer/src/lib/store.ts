import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/authSlice"

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
    }
  })
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']