"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import PostComponent from "@/components/layouts/postComponent/Post";
import { Post } from "@/types/post";
import { POSTS_ALL_ENDPOINT } from "@/constants/api";

const InfiniteScrollPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPosts = useCallback(async (cursor: string | null = null) => {
    setLoading(true);
    setIsFetching(true);
    try {
      const response = await axios.get(POSTS_ALL_ENDPOINT, {
        params: { cursor },
      });
      const newPosts = response.data.posts || [];

      // 重複を除外
      setPosts((prevPosts) => [
        ...prevPosts,
        ...newPosts.filter(
          (newPost: Post) => !prevPosts.some((post) => post._id === newPost._id)
        ),
      ]);

      if (response.data.nextCursor) {
        setNextCursor(response.data.nextCursor);
      } else {
        setNextCursor(null); // 取得できる投稿がない場合
      }
    } catch (err) {
      alert("投稿の取得に失敗しました:");
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, []);

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
    <div className="flex justify-center shadow-md rounded-lg w-full max-w-xl mx-auto">
      <div className="w-full mx-10 relative">
        {loading ? (
          <LoadingSpinner />
        ) : (
          posts.map((post) => <PostComponent key={post._id} post={post} />)
        )}
        {isFetching && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default InfiniteScrollPosts;
