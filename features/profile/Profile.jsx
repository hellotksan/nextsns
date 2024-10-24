"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/state/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function ShowProfile(props) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const username = props.username;
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // ユーザー情報の取得
  const { data: showingUser, error: userError } = useSWR(
    `${PUBLIC_FOLDER}/api/users?username=${username}`,
    fetcher
  );

  // フォローチェック
  const { data: followingData } = useSWR(
    user.followings
      ? user.followings.map((id) => `${PUBLIC_FOLDER}/api/users/${id}`)
      : null,
    fetcher
  );

  // フォロー状態のチェック
  const isFollowing = Array.isArray(followingData)
    ? followingData.some((followedUser) => followedUser.username === username)
    : false;

  if (userError) {
    toast.error("ユーザーが見つかりませんでした。");
    router.push("/");
    return null; // ユーザーが見つからない場合は何も表示しない
  }

  if (!showingUser) {
    return <LoadingSpinner />;
  }

  const handleFollow = async () => {
    try {
      await axios.put(`${PUBLIC_FOLDER}/api/users/${showingUser._id}/follow`, {
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
      await axios.put(
        `${PUBLIC_FOLDER}/api/users/${showingUser._id}/unfollow`,
        {
          userId: user._id,
        }
      );
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
    <>
      <div className="p-4 mt-5 bg-white shadow-2xl rounded-lg max-w-2xl mx-auto">
        <div className="flex items-center space-x-4">
          {showingUser.profilePicture ? (
            <Image
              src={`/assets/person/${showingUser.profilePicture}`}
              alt=""
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
          <span className="ml-2">{followerCount} follwer</span>
          <span className="ml-3">{followingCount} following</span>
        </div>

        {username !== user.username && (
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
    </>
  );
}

export default ShowProfile;
