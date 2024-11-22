import React from "react";
import Topbar from "@/components/layouts/header/Header";
import AllUsersComponent from "@/components/layouts/allUsers/AllUsers";

const AllUsersPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Topbar />
      <div className="max-w-xl mx-auto">
        <AllUsersComponent />
      </div>
    </div>
  );
};

export default AllUsersPage;
