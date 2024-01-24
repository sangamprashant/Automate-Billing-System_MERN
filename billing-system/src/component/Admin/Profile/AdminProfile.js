import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import { Tooltip } from "antd";
import { EditIcon, PersonIcon } from "../../../assets/icons";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

function AdminProfile() {
  const [frame, setFrame] = useState("all");

  const renderSelectedFrame = () => {
    switch (frame) {
      case "all":
        return <Profile />;
      case "add":
        return <EditProfile />;
      default:
        return <Profile />;
    }
  };

  return (
    <SideNav>
      <div className="admin-operators">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="dashboard-title">Profile</h1>
          <div className="d-flex gap-3">
            <Tooltip title="View Your Profile">
              <button
                className={`btn btn-${
                  frame === "all" ? "primary" : "outline-secondary"
                }`}
                onClick={() => setFrame("all")}
              >
                <PersonIcon />
              </button>
            </Tooltip>
            <Tooltip title="Edit Your Profile">
              <button
                className={`btn btn-${
                  frame === "add" ? "primary" : "outline-secondary"
                }`}
                onClick={() => setFrame("add")}
              >
                <EditIcon />
              </button>
            </Tooltip>
          </div>
        </div>
        <hr className="mb-4" />
        {renderSelectedFrame()}
      </div>
    </SideNav>
  );
}

export default AdminProfile;
