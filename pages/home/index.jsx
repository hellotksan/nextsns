import React, { useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Timeline from "../../components/Timeline/Timeline";
import Rightbar from "../../components/Rightbar/Rightbar";
import { AuthContext } from "../../state/AuthContext";
import "./index.css";

function Home() {
  const { user, isFetching, error } = useContext(AuthContext);

  if (!user) {
    return <div>User not found</div>;
  }
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Timeline toHome={true} />
        <Rightbar />
      </div>
    </>
  );
}

export default Home;
