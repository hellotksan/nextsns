import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";

function ShowProfile(props) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const username = props.username;

  const { user } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showingUser, setShowingUser] = useState({});

  useEffect(() => {
    const fetchShowingUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?username=${username}`
        );
        setShowingUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShowingUser();
  }, [username, PUBLIC_FOLDER]);

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
  }, [user, username, PUBLIC_FOLDER]);

  const handleFollow = async () => {
    try {
      await axios.put(`${PUBLIC_FOLDER}/api/users/${showingUser._id}/follow`, {
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
    setIsFollowing(true);
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
  };

  return (
    <>
      <div className="">
        <div className="text-2xl">
          ユーザーアイコン:
          {showingUser.profilePicture ? (
            <Image
              src={`${PUBLIC_FOLDER}/images/${showingUser.profilePicture}`}
              alt=""
              width={15}
              height={15}
            />
          ) : (
            <PersonIcon />
          )}
        </div>
        <div className="">
          <h4 className="text-2xl">ユーザー名: {showingUser.username}</h4>
          <span className="text-lg">ユーザー情報: {showingUser.desc}</span>
          {username !== user.username &&
            (isFollowing ? (
              <button
                className="mt-2 px-5 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleUnfollow}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="mt-2 px-5 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleFollow}
              >
                Follow
              </button>
            ))}
        </div>
      </div>
    </>
  );
}

export default ShowProfile;
