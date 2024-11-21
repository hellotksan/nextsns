import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import Cookies from "js-cookie";

// 初期状態の設定
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const savedUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

const initialState: AuthState = {
  user: savedUser,
  isLoading: false,
  error: null,
};

// authSliceの作成
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
      Cookies.set("user", JSON.stringify(action.payload), {
        secure: true,
        sameSite: "Strict",
        expires: 7,
        path: "/",
      });
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("user");
    },
  },
});

// アクションとreducerのエクスポート
export const { loginStart, loginSuccess, loginError, logout } =
  authSlice.actions;
export default authSlice.reducer;
