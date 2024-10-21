"use client";

import { AuthContext } from "../../../../state/AuthContext";
import React, { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

// components
import UserNotFound from "@/components/layouts/userNotFound/UserNotFound";
import Loading from "@/components/layouts/loading/Loading";
import Sidebar from "@/components/layouts/leftbar/Leftbar";
import Topbar from "@/components/layouts/header/Header";
import Error from "@/components/layouts/error/Error";

// features
import EditPost from "@/features/editPost/EditPost";

function PostEdit() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();
  const { username, postId } = params;
  const { user, isFetching, error } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get(`${PUBLIC_FOLDER}/api/users?username=${user.username}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [PUBLIC_FOLDER, user.username]);

  if (!user) {
    return <UserNotFound />;
  }
  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  if (!username || !postId) {
    return <div>Invalid post or user information!</div>;
  }

  return (
    <>
      <Topbar />
      <Sidebar />
      <EditPost postId={postId} />
    </>
  );
}

export default PostEdit;
