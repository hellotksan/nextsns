import React, { useContext, useEffect } from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import EditPost from "../../../components/EditPost/index";
import { AuthContext } from "../../../state/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import "./index.css";

function PostEdit() {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { username, postId } = router.query;
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
  }, [user.username, PUBLIC_FOLDER]);

  if (!user) {
    return <div>User not found!</div>;
  }
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <EditPost username={username} postId={postId} />
        </div>
      </div>
    </>
  );
}

export default PostEdit;
