"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import PostForm from "@/components/layouts/postForm/PostForm";
import PostComponent from "@/components/layouts/postComponent/Post";
import { POSTS_ENDPOINT } from "@/constants/api";
import { useAppSelector } from "@/hooks/useSelector";
import { User } from "@/types/user";
import { Post } from "@/types/post";

interface TimelineProps {
  toHome?: boolean;
  username?: string;
}

const Timeline: React.FC<TimelineProps> = ({ toHome = false, username }) => {
  const { user } = useAppSelector((state) => state.auth) as { user: User };
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // クライアントサイドでのレンダリングを有効化
  }, []);

  const handlePostSuccess = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const fetchPosts = useCallback(
    async (cursor: string | null = null) => {
      if (!user && toHome) return null;

      setIsFetching(true);

      const endpoint = username
        ? `${POSTS_ENDPOINT}/profile/${username}`
        : `${POSTS_ENDPOINT}/timeline/${user._id}`;

      try {
        const response = await axios.get(endpoint, { params: { cursor } });
        const newPosts = response.data.posts || response.data || [];

        setPosts((prev) => {
          const mergedPosts = [...prev, ...newPosts];
          // 重複を削除（IDが重複する投稿を1つだけ残す）
          const uniquePosts = Array.from(
            new Map(mergedPosts.map((post: Post) => [post._id, post])).values()
          );
          return uniquePosts.sort(
            (post1, post2) =>
              new Date(post2.createdAt).getTime() -
              new Date(post1.createdAt).getTime()
          );
        });

        if (response.data.nextCursor) {
          setNextCursor(response.data.nextCursor);
        }
      } catch (error) {
        alert("投稿の取得に失敗しました。もう一度お試しください。");
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    },
    [username, user, toHome]
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

  if (!user && toHome) return null;

  if (!isClient) return null; // クライアントサイドでない場合、何も表示しない

  return (
    <div className="flex justify-center border-x-2 rounded-lg w-full max-w-xl mx-auto">
      <div className="w-full mx-10 relative">
        {toHome || username === user?.username ? (
          <PostForm onPostSuccess={handlePostSuccess} />
        ) : null}

        {loading
          ? null
          : posts.map((post) => <PostComponent key={post._id} post={post} />)}

        {isFetching && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Timeline;
