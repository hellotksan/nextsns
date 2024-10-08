import React, { useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ShowProfile from "../../components/Profile/Profile";
import Timeline from "../../components/Timeline/Timeline";
import Rightbar from "../../components/Rightbar/Rightbar";
import { AuthContext } from "../../state/AuthContext";
import { useRouter } from "next/router";
import "./index.css";

function Profile() {
  const router = useRouter();
  const { username } = router.query;
  const { user, isFetching, error } = useContext(AuthContext);

  if (!username) {
    return <div>ユーザー名が存在しません。</div>;
  }
  if (!user) {
    return <div>ユーザーが存在しません。</div>;
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
          <ShowProfile username={username} />
          <Rightbar user={user} />
          <div className="profileRightBottom">
            <Timeline username={username} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
