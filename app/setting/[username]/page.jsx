"use client";

import React, { useContext } from "react";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SettingComponent from "../../../components/Setting/index";
import { AuthContext } from "../../../state/AuthContext";
import { useParams } from "next/navigation";
import styles from "./Setting.module.css";

function Setting() {
  const { username } = useParams();
  const { user, isFetching, error } = useContext(AuthContext);

  if (!user) {
    return <div>User not found!</div>;
  }
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <>
      <Topbar />
      <div className={styles.profile}>
        <Sidebar />
        <div className={styles.profileRight}>
          <SettingComponent username={username} />
        </div>
      </div>
    </>
  );
}

export default Setting;
