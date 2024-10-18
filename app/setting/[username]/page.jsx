"use client";

import { AuthContext } from "../../../state/AuthContext";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

// components
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Loading from "@/components/layouts/loading/Loading";
import Error from "@/components/layouts/error/Error";
import Sidebar from "../../../components/layouts/leftbar/Leftbar";
import Topbar from "../../../components/layouts/header/Header";

// features
import SettingComponent from "../../../features/setting/Setting";

function Setting() {
  const { username } = useParams();
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
      <SettingComponent username={username} />
    </>
  );
}

export default Setting;
