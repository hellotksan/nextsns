"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../../state/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import Post from "../post/Post";
import Image from "next/image";
import axios from "axios";

// module css files
import styles from "./Timeline.module.css";

function Timeline({ toHome = false, username }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      await axios.post(`${PUBLIC_FOLDER}/api/posts/`, newPost);
      setPosts((prev) => [{ ...newPost, _id: Date.now() }, ...prev]);
      desc.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      try {
        const response = username
          ? // プロフィールの場合
            await axios.get(`${PUBLIC_FOLDER}/api/posts/profile/${username}`)
          : // ホームの場合
            await axios.get(`${PUBLIC_FOLDER}/api/posts/timeline/${user._id}`);

        if (isMounted) {
          setPosts(
            response.data.sort((post1, post2) => {
              return new Date(post2.createdAt) - new Date(post1.createdAt);
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [PUBLIC_FOLDER, username, user._id]);

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineWrapper}>
        {/* share */}
        {!toHome && username !== user.username ? (
          <div>投稿権限がありません。</div>
        ) : (
          <div className={styles.share}>
            <div className={styles.shareWrapper}>
              <div className={styles.shareTop}>
                {user.profilePicture ? (
                  <Image
                    src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                    alt=""
                    className={styles.shareProfileImg}
                    width={50}
                    height={50}
                  />
                ) : (
                  <PersonIcon className={styles.shareProfileImg} />
                )}
                <textarea
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-vertical"
                  placeholder="今何してるの？"
                  ref={desc}
                />
              </div>
              <hr className={styles.shareHr} />

              <form
                className={styles.shareButtons}
                onSubmit={(e) => handleSubmit(e)}
              >
                <button className={styles.shareButton} type="submit">
                  投稿
                </button>
              </form>
            </div>
          </div>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;
