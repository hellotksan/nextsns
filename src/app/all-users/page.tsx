import React from "react";
import Topbar from "@/components/layouts/header/Header";
import AllUsers from "@/components/layouts/allUsers/AllUsers";

const AllUsersPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-xl mx-auto">
        <AllUsers />
      </div>
    </div>
  );
};

export default AllUsersPage;
