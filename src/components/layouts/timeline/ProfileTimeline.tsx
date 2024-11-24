"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PostForm from "./PostForm";
import SinglePost from "./SinglePost";
import { POSTS_ENDPOINT } from "@/constants/api";
import { User } from "@/types/user";
import { Post } from "@/types/post";
import { useAuth } from "@/hooks/useAuth";

interface TimelineProps {
  username: string | null;
}

const ProfileTimeline: React.FC<TimelineProps> = ({ username = null }) => {
  const { user } = useAuth() as { user: User };
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handlePostSuccess = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const fetchPosts = useCallback(
    async (cursor: string | null = null) => {
      if (!user) return null;
      setIsFetching(true);
      const endpoint = `${POSTS_ENDPOINT}/profile/${username}`;

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
      } catch (err) {
        alert("投稿の取得に失敗しました。もう一度お試しください。");
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    },
    [username, user]
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

  if (!user) return null;

  return (
    <div className="w-full flex justify-center">
      <div className="relative">
        {username === user?.username ? (
          <PostForm onPostSuccess={handlePostSuccess} />
        ) : null}

        {loading
          ? null
          : posts.map((post) => <SinglePost key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default ProfileTimeline;
