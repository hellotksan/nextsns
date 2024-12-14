"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { USERS_ENDPOINT } from "@/constants/api";
import { useUser } from "@/hooks/useUser";
import PersonIcon from "@mui/icons-material/Person";
import RocketIcon from "@mui/icons-material/Rocket";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";

interface ProfileComponentProps {
  username: string;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ username }) => {
  const { user } = useAuth() as { user: User };
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const { userData: showingUser, isError } = useUser(username);

  // ユーザーのフォロー状態を確認
  useEffect(() => {
    if (user && showingUser) {
      const following = showingUser.followers?.some(
        (followerId: string) => followerId === user._id
      );

      setIsFollowing(following || false);
    }
  }, [user, showingUser]);

  // ユーザーが見つからない場合のリダイレクト処理
  useEffect(() => {
    if (isError) {
      toast.error("ユーザーが見つかりませんでした。");
      router.replace("/");
    }
  }, [isError, router]);

  if (!showingUser) return null;

  const handleFollow = async () => {
    if (user && user._id) {
      try {
        await axios.put(`${USERS_ENDPOINT}/${showingUser._id}/follow`, {
          userId: user._id,
        });
        setIsFollowing(true);
        toast.success("フォローしました！");
      } catch (err) {
        toast.error("フォローに失敗しました。");
      }
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.put(`${USERS_ENDPOINT}/${showingUser._id}/unfollow`, {
        userId: user._id,
      });
      setIsFollowing(false);
      toast.info("フォローを解除しました。");
    } catch (error) {
      toast.error("フォロー解除に失敗しました。");
    }
  };

  // フォロー人数とフォロワー人数の取得
  const followingCount = Array.isArray(showingUser.followings)
    ? showingUser.followings.length
    : 0;
  const followerCount = Array.isArray(showingUser.followers)
    ? showingUser.followers.length
    : 0;

  return (
    <div className="p-4 mt-2 mb-2 border-2 shadow-md rounded-lg max-w-xl mx-auto">
      <div className="flex items-center space-x-4">
        <div className="ml-2">
          {showingUser.profilePicture ? (
            <RocketIcon fontSize="large" />
          ) : (
            <PersonIcon fontSize="large" />
          )}
        </div>
        <div className="text-xl font-semibold">
          {showingUser.username}{" "}
          {username === user?.username && (
            <span className="text-xl font-semibold">(you)</span>
          )}
        </div>
        <span className="text-gray-500">@{showingUser.username}</span>
      </div>
      <div className="mt-5 text-lg">
        {showingUser.desc || "自己紹介がありません。"}
      </div>

      {/* フォロー人数とフォロワー人数の表示 */}
      <div className="mt-4 flex text-gray-500">
        <span className="ml-2">{followerCount} follower</span>
        <span className="ml-3">{followingCount} following</span>
      </div>

      {user && username !== user?.username && (
        <div className="text-center">
          <button
            className={`mt-2 px-5 py-2 rounded text-white ${
              isFollowing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={isFollowing ? handleUnfollow : handleFollow}
          >
            {isFollowing ? "フォロー解除" : "フォロー"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
