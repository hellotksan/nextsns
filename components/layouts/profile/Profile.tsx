"use client";

import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";
import { USERS_ENDPOINT } from "@/constants/api";
import { useAppSelector } from "@/hooks/useSelector";
import { User } from "@/types/user";
import { useUser } from "@/hooks/useUser";

interface ProfileComponentProps {
  username: string;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ username }) => {
  const { user } = useAppSelector((state) => state.auth) as { user: User };
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // ユーザー情報の取得
  const { userData: showingUser, isLoading, isError } = useUser(username);

  // ユーザーのフォロー状態を確認
  useEffect(() => {
    if (user && showingUser) {
      const following = showingUser.followers?.some(
        (followerId: string) => followerId === user._id
      );

      setIsFollowing(following || false);
    }
  }, [user, showingUser]);

  // ユーザーが見つからない場合は何も表示しない
  if (isError) {
    toast.error("ユーザーが見つかりませんでした。");
    router.replace("/");
    return null;
  }

  if (isLoading || !showingUser) {
    return <LoadingSpinner />;
  }

  const handleFollow = async () => {
    try {
      await axios.put(`${USERS_ENDPOINT}/${showingUser._id}/follow`, {
        userId: user._id,
      });
      setIsFollowing(true);
      toast.success("フォローしました！");
    } catch (error) {
      toast.error("フォローに失敗しました。");
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
    <div className="p-4 mt-5 shadow-md rounded-lg max-w-xl mx-auto">
      <div className="flex items-center space-x-4">
        {showingUser.profilePicture ? (
          <Image
            src={`/assets/person/${showingUser.profilePicture}`}
            alt="profile-picture"
            width={50}
            height={50}
            className="ml-2 rounded-full"
          />
        ) : (
          <PersonIcon fontSize="large" className="ml-2" />
        )}
        <h2 className="text-xl font-semibold">{showingUser.username}</h2>
        <p className="text-gray-500">@{showingUser.username}</p>
      </div>
      <div className="mt-5 text-lg">
        {showingUser.desc || "自己紹介がありません。"}
      </div>

      {/* フォロー人数とフォロワー人数の表示 */}
      <div className="mt-4 flex text-gray-500">
        <span className="ml-2">{followerCount} follower</span>
        <span className="ml-3">{followingCount} following</span>
      </div>

      {username !== user?.username && (
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
