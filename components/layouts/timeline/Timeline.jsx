"use client";

import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "@/state/AuthContext";
import Post from "../post/Post";
import Image from "next/image";
import axios from "axios";

// components
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";

function Timeline({ toHome = false, username }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 空の投稿を防ぐため
    if (!desc.current.value.trim()) {
      alert("投稿内容を入力してください。");
      return;
    }

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
      setLoading(true);
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
        setLoading(false);
      } catch (error) {
        alert("投稿の取得に失敗しました。もう一度お試しください。");
        console.error(error);
      }
    };
    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [PUBLIC_FOLDER, username, user._id]);

  return (
    <div className="flex justify-center p-5 bg-white shadow-md rounded-lg w-full max-w-2xl mx-auto">
      <div className="w-full p-5 relative">
        {/* share */}
        {!toHome && username !== user.username ? (
          <div>投稿権限がありません。</div>
        ) : (
          <div className="sticky top-10 bg-white h-[170px] shadow-lg rounded-lg py-5 z-10">
            <div className="p-2">
              <div className="flex items-center">
                {user.profilePicture ? (
                  <Image
                    src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                    alt="profile-picture"
                    className="w-12 h-12 rounded-full object-cover mr-2"
                    width={50}
                    height={50}
                  />
                ) : (
                  <PersonIcon className="w-12 h-12 mr-2" />
                )}
                <textarea
                  className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-vertical"
                  placeholder="今何してるの？"
                  ref={desc}
                />
              </div>
              <hr className="my-5" />

              <form
                className="flex items-center justify-between"
                onSubmit={(e) => handleSubmit(e)}
              >
                <button
                  className="bg-blue-800 text-white py-1 px-4 rounded-md hover:bg-blue-900 transition"
                  type="submit"
                >
                  投稿
                </button>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default Timeline;
