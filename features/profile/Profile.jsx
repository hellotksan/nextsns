"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/state/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import axios from "axios";

import LoadingSpinner from "@/components/elements/loadingSpinner/LoadingSpinner";

function ShowProfile(props) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;
  const username = props.username;
  const { user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showingUser, setShowingUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowingUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${username}`
        );
        if (response.data) {
          setShowingUser(response.data);
        } else {
          setError("ユーザーが見つかりませんでした。");
        }
      } catch (error) {
        console.error(error);
        setError("ユーザーが見つかりませんでした。");
      } finally {
        setLoading(false);
      }
    };
    fetchShowingUser();
  }, [username]);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (user.followings) {
        try {
          for (const id of user.followings) {
            const response = await axios.get(
              `${PUBLIC_FOLDER}/api/users/${id}`
            );
            const data = await response.data;

            if (data.username === username) {
              setIsFollowing(true);
              break;
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    checkFollowingStatus();
  }, [user, username]);

  const handleFollow = async () => {
    try {
      await axios.put(`${PUBLIC_FOLDER}/api/users/${showingUser._id}/follow`, {
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
    setIsFollowing(true);
    setError("アクションの実行に失敗しました。");
  };

  const handleUnfollow = async () => {
    try {
      await axios.put(
        `${PUBLIC_FOLDER}/api/users/${showingUser._id}/unfollow`,
        {
          userId: user._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
    setIsFollowing(false);
    setError("アクションの実行に失敗しました。");
  };

  if (error) {
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
        <div className="flex items-center mb-4">
          <p className="text-red-500 text-center">
            ユーザーが見つかりませんでした。
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
        <div className="flex items-center mb-4">
          <div className="text-lg">ユーザアイコン:</div>
          {showingUser.profilePicture ? (
            <Image
              src={`${PUBLIC_FOLDER}/images/${showingUser.profilePicture}`}
              alt=""
              width={15}
              height={15}
              className="ml-2 rounded-full"
            />
          ) : (
            <PersonIcon fontSize="large" className="ml-2" />
          )}
        </div>
        <div className="mb-4">
          <div className="text-lg">ユーザ名: {showingUser.username}</div>
          <div className="text-lg">ユーザ情報: {showingUser.desc}</div>
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
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowProfile;
