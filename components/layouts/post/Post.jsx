import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../state/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
// import { MoreVert } from "@mui/icons-material";
import { format } from "timeago.js";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// module css files
import styles from "./Post.module.css";

function Post({ post }) {
  const PUBLIC_FOLDER = process.env.NEXT_PUBLIC_API_URL;

  const [like, setLike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${PUBLIC_FOLDER}/api/users?userId=${post.userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [post.userId, PUBLIC_FOLDER]);

  // いいねボタンの処理
  const handleLike = async () => {
    try {
      await axios.put(`${PUBLIC_FOLDER}/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        {/* 投稿したユーザーのプロフィールを表示 */}
        <div className={styles.postTop}>
          <div className={styles.postTopLeft}>
            <Link
              href={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {user.profilePicture ? (
                <Image
                  src={`${PUBLIC_FOLDER}/images/${user.profilePicture}`}
                  alt=""
                  className={styles.postProfileImg}
                  width={32}
                  height={32}
                />
              ) : (
                <PersonIcon className={styles.postProfileImg} />
              )}
              <span className={styles.postUsername}>{user.username}</span>
            </Link>
            <span className={styles.postDate}>{format(post.createdAt)}</span>
          </div>
          {/* <div className={styles.postTopRight}>
            <MoreVert />
          </div> */}
        </div>

        {/* 投稿した内容を表示する */}
        <div className={styles.postCenter}>
          <Link
            href={`/postEdit/${user.username}/${post._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <span className={styles.postText}>{post.desc}</span>
            {post.img ? (
              <Image
                src={`${PUBLIC_FOLDER}/images/${post.img}`}
                alt=""
                className={styles.postImg}
                width={50}
                height={50}
              />
            ) : (
              <></>
            )}
          </Link>
        </div>

        {/* 投稿記事のいいね数とコメント数を表示する */}
        <div className={styles.postBottom}>
          {/* いいね数の表示 */}
          <div className={styles.postButtomLeft}>
            <FavoriteIcon
              className={styles.likeIcon}
              style={{ color: "red" }}
              onClick={() => {
                handleLike();
              }}
            />
            <span className={styles.postLikeCounter}>
              {like}
            </span>
          </div>
          {/* コメント数の表示 */}
          {/* <div className="postButtomRight">
            <span className="postCommentText">{post.comment}コメント</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
