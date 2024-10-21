"use client";

import { AuthContext } from "@/state/AuthContext";
import React, { useContext } from "react";

// components
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Sidebar from "@/components/layouts/leftbar/Leftbar";
import Loading from "@/components/layouts/loading/Loading";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";

// features
import Friends from "@/features/friends/Friends";

function Followers() {
  const { user, isFetching, error } = useContext(AuthContext);

  if (!user) {
    return <UserNotFound />;
  }
  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      <Topbar />
      <Sidebar />
      <Friends />
    </>
  );
}

export default Followers;
