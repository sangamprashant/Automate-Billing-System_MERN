import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function Topbar({ user, isSidebarOpen, setIsSidebarOpen }) {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="border w-100 p-3 rounded-2 bg-white">
      <div className="d-flex  justify-content-between">
        <Button onClick={toggleSidebar} className=" text-dark">
          {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
        <Link className="text-black text-decoration-none" to="/admin/profile">
          {user?.name}
          <AccountCircleIcon style={{ marginLeft: "10px" }} />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
