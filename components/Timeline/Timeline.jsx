import React, { useContext, useEffect, useState } from "react";
import "./Timeline.css";
import Share from "../share/Share";
import Post from "../Post/Post";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

function Timeline({ toHome = false, username }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`${PUBLIC_FOLDER}/api/posts/profile/${username}`) // プロフィールの場合
        : await axios.get(`${PUBLIC_FOLDER}/api/posts/timeline/${user._id}`); // ホームの場合
      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [PUBLIC_FOLDER, username, user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share toHome={toHome} username={username} />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
