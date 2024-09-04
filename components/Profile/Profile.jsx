import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import "./index.css";

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
    <div className="profileRightTop">
      <div className="profileCover">
        {/* <img
          src={
            user.coverPicture
              ? PUBLIC_FOLDER + "/images" + user.coverPicture
              : PUBLIC_FOLDER + "/images/post/3.jpeg"
          }
          alt=""
          className="profileCoverImg"
        /> */}
        {showingUser.profilePicture ? (
          <Image
            src={`${PUBLIC_FOLDER}/images/${showingUser.profilePicture}`}
            alt=""
            className="profileUserImg"
            width={150}
            height={150}
          />
        ) : (
          <PersonIcon className="profileUserImg" />
        )}
      </div>
      <div className="profileInfo">
        <h4 className="profileInfoName">{showingUser.username}</h4>
        <span className="profileInfoDesc">{showingUser.desc}</span>
        {username !== user.username &&
          (isFollowing ? (
            <button className="followButton unfollow" onClick={handleUnfollow}>
              Unfollow
            </button>
          ) : (
            <button className="followButton follow" onClick={handleFollow}>
              Follow
            </button>
          ))}
      </div>
    </div>
  );
}

export default ShowProfile;
