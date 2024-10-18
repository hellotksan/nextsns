"use client";

import React, { useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import AllFriend from "../../components/allFriend/AllFriend";
import { AuthContext } from "../../state/AuthContext";
import styles from "./Users.module.css";

function Users() {
  const { user, isFetching, error } = useContext(AuthContext);

  if (!user) {
    return <div>User not found.</div>;
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
          <AllFriend />
        </div>
      </div>
    </>
  );
}

export default Users;
