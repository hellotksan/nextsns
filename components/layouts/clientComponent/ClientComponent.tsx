"use client";

import { AuthContext } from "@/state/AuthContext";
import React, { useContext } from "react";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Loading from "@/components/layouts/loading/Loading";
import Error from "@/components/layouts/error/Error";

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  const { user, isFetching, error } = useContext(AuthContext);

  if (isFetching) return <Loading />;
  if (error) return <Error />;
  if (!user) return <UserNotFound />;

  return <>{children}</>;
};

export default ClientComponent;
