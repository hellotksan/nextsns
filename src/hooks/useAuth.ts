import { useAppDispatch } from "@/hooks/useDispatch";
import { useAppSelector } from "@/hooks/useSelector";
import {
  loginStart,
  loginSuccess,
  loginError,
  logout,
} from "@/features/auth/authSlice";
import { User } from "@/types/user";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  const login = async (userData: User) => {
    dispatch(loginStart());
    try {
      // ここでAPI通信などを行う
      dispatch(loginSuccess(userData));
    } catch (err) {
      dispatch(loginError("ログインに失敗しました"));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { user, isLoading, error, login, logoutUser };
};
