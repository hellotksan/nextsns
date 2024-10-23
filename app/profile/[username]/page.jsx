"use client";

import { AuthContext } from "@/state/AuthContext";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Timeline from "@/components/layouts/timeline/Timeline";
import Loading from "@/components/layouts/loading/Loading";
import Sidebar from "@/components/layouts/leftbar/Leftbar";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";
import ShowProfile from "@/features/profile/Profile";
import "./index.css";

function Profile() {
  const { username } = useParams();
  const { user, isFetching, error } = useContext(AuthContext);

  if (!username) {
    return <div>ユーザー名が存在しません。</div>;
  }
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
      {/* <Sidebar /> */}
      <ShowProfile username={username} />
      <Timeline username={username} />
    </>
  );
}

export default Profile;
