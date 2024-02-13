import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import { Tooltip } from "antd";
import { EditIcon, PersonIcon } from "../../../assets/icons";
import EditProfile from "./EditProfile";
import ProfileOrdersAll from "../Orders/ProfileOrdersAll";
import { AppContext } from "../../../AppContext";
import Spiner from "../../Loading/Spin";

function AdminProfile() {
  const {
    token,
    setToken,
    isLogged,
    setIsLogged,
    goToPayment,
    setGoToPayment,
    isLoading,
    setIsLoading,
    userData,
    setUserData,
    categories,
    setCategories,
  } = React.useContext(AppContext);
  const [frame, setFrame] = useState("all");

  const renderSelectedFrame = () => {
    switch (frame) {
      case "all":
        return <>{userData ? <ProfileOrdersAll operator={userData} isAdmin={true}/> : <Spiner />}</>;
      case "add":
        return <EditProfile operator={userData} setUserData={setUserData}/>;
      default:
        return <>{userData ? <ProfileOrdersAll operator={userData} isAdmin={true}/> : <Spiner />}</>;
    }
  };

  return (
    <SideNav>
      <div className="admin-operators">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="dashboard-title">{userData?.name}'s Profile</h1>
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
