"use client";

import axios from "axios";
import React, { useContext, useEffect } from "react";
import Topbar from "../../../../components/topbar/Topbar";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import EditPost from "../../../../components/EditPost/index";
import { AuthContext } from "../../../../state/AuthContext";
import { useParams } from "next/navigation";
import styles from "./Post.module.css";

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
    return <div>User not found!</div>;
  }
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred</div>;
  }

  if (!username || !postId) {
    return <div>Invalid post or user information!</div>;
  }

  return (
    <>
      <Topbar />
      <div className={styles.profile}>
        <Sidebar />
        <div className={styles.profileRight}>
          <EditPost username={username} postId={postId}/>
        </div>
      </div>
    </>
  );
}

export default PostEdit;
