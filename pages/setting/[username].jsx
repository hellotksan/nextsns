import React, { useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingComponent from "../../components/Setting/index";
import { AuthContext } from "../../state/AuthContext";
import { useRouter } from "next/router";
import "./index.css";

function Setting() {
  const router = useRouter();
  const { username } = router.query;
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
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <SettingComponent username={username} />
        </div>
      </div>
    </>
  );
}

export default Setting;
