"use client";

import React from "react";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Loading from "@/components/layouts/loading/Loading";
import Error from "@/components/layouts/error/Error";
import { useAppSelector } from "@/hooks/useSelector";

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  // if (isLoading) return <Loading />;
  // if (error) return <Error />;
  // if (!user) return <UserNotFound />;

  return <>{children}</>;
};

export default ClientComponent;
