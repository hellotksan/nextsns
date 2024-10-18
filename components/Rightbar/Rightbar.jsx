"use client";

import React from "react";
import CloseFriend from "../closeFriend/CloseFriend";
import { useParams } from "react-router-dom";
import "./index.css";

function Rightbar({ user }) {
  const { username: showingUsername } = useParams();

  // ホームページ用の右サイドバー
  const HomeRightbar = () => {
    return <></>;
  };

  // ユーザに関する情報を表示するプロフィールページ用の右サイドバー
  const ProfileRightbar = () => {
    return (
      <>
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
