import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// 型の定義
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
