"use client";

import { AuthContext } from "@/state/AuthContext";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Loading from "@/components/layouts/loading/Loading";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";
import EditPost from "@/features/editPost/EditPost";

function PostEdit() {
  const { user, isFetching, error } = useContext(AuthContext);
  const params = useParams();
  const { postId } = params;

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
      <EditPost postId={postId} />
    </>
  );
}

export default PostEdit;
