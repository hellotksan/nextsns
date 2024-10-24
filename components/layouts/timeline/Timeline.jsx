"use client";

import { AuthContext } from "@/state/AuthContext";
import Post from "@/components/layouts/post/Post";
import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import PostForm from "@/components/layouts/postForm/PostForm";

function Timeline({ toHome = false, username }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handlePostSuccess = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const fetchPosts = useCallback(
    async (cursor = null) => {
      setIsFetching(true);

      const endpoint = username
        ? `${PUBLIC_FOLDER}/api/posts/profile/${username}`
        : `${PUBLIC_FOLDER}/api/posts/timeline/${user._id}`;

      try {
        const response = await axios.get(endpoint, { params: { cursor } });
        const newPosts = response.data.posts || response.data || [];

        setPosts((prev) => {
          const mergedPosts = [...prev, ...newPosts];
          // 重複を削除（IDが重複する投稿を1つだけ残す）
          const uniquePosts = Array.from(
            new Map(mergedPosts.map((post) => [post._id, post])).values()
          );
          return uniquePosts.sort(
            (post1, post2) =>
              new Date(post2.createdAt) - new Date(post1.createdAt)
          );
        });

        if (response.data.nextCursor) {
          setNextCursor(response.data.nextCursor);
        }
      } catch (error) {
        alert("投稿の取得に失敗しました。もう一度お試しください。");
        console.error(error);
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    },
    [PUBLIC_FOLDER, username, user._id]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isFetching &&
      nextCursor
    ) {
      fetchPosts(nextCursor);
    }
  }, [fetchPosts, isFetching, nextCursor]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex justify-center p-5 bg-white shadow-md rounded-lg w-full max-w-2xl mx-auto">
      <div className="w-full p-5 relative">
        {toHome || username === user.username ? (
          <PostForm onPostSuccess={handlePostSuccess} />
        ) : null}
        {loading ? (
          <LoadingSpinner />
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )}
        {isFetching && <LoadingSpinner />}{" "}
        {/* 無限スクロール中のローディング表示 */}
      </div>
    </div>
  );
}

export default Timeline;
