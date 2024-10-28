"use client";

import { ReactNode, FC, useContext } from "react";
import { useParams } from "next/navigation";
import { AuthContext } from "@/state/AuthContext";
import { User } from "@/types/user";
import Loading from "@/components/layouts/loading/Loading";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Error from "@/components/layouts/error/Error";

// Propsの型定義
interface AuthWrapperProps {
  children: ReactNode;
}

// AuthContextの値の型を定義
interface AuthContextValue {
  user: User | null;
  isFetching: boolean;
  error: boolean;
}

// AuthWrapperコンポーネントの定義
const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const { userId } = useParams();
  const {
    user,
    isFetching,
    error: isError,
  } = useContext(AuthContext) as AuthContextValue;

  if (!user) return <UserNotFound />;
  if (isFetching) return <Loading />;
  if (isError) return <Error />;

  return <>{children}</>;
};

export default AuthWrapper;
