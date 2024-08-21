import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/authSlice"
import postSlice from "./features/postSlice"

export const createStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      post: postSlice,
    }
  })
}

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']