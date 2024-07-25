import React, { useContext } from "react";
import "./Rightbar.css";
import CloseFriend from "../closeFriend/CloseFriend";
import { AuthContext } from "../../state/AuthContext";
import { useParams } from "react-router-dom";

function Rightbar({ user }) {
  const { username: showingUsername } = useParams();
  const { isFetching, error } = useContext(AuthContext);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // ホームページ用の右サイドバー
  const HomeRightbar = () => {
    return <></>;
  };

  // プロフィールページ用の右サイドバー
  const ProfileRightbar = () => {
    return (
      <>
        {/* ユーザに関する情報を表示する */}
        <h4 className="rightbarTitle">ユーザ情報</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">出身:</span>
            <span className="rightbarInfoKey">未設定</span>
          </div>
          {user.username === showingUsername && (
            <div className="rightbarFollowing">
              <CloseFriend />
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
