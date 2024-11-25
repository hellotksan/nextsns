import { useAppDispatch } from "@/hooks/useDispatch";
import { useAppSelector } from "@/hooks/useSelector";
import {
  loginStart,
  loginSuccess,
  loginError,
  logout,
} from "@/features/auth/authSlice";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (userData: User) => Promise<void>;
  logoutUser: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const login = async (userData: User) => {
    dispatch(loginStart());
    try {
      dispatch(loginSuccess(userData));
      router.push("/home");
    } catch (err) {
      dispatch(loginError("ログインに失敗しました"));
      router.refresh();
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    router.push("/")
  };

  return { user, isLoading, error, login, logoutUser };
};
