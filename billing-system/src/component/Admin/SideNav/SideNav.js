import HomeIcon from "@mui/icons-material/Home";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Groups2Icon from "@mui/icons-material/Groups2";
import Topbar from "../TopBar/Topbar";
import { message } from "antd";
import { AppContext } from "../../../AppContext";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidenav.css";
import {
  AssignmentIndIcon,
  Inventory2Icon,
  ListIcon,
  PersonIcon,
} from "../../../assets/icons";

function SideNav({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { token, setToken, isLogged, setIsLogged, userData } =
    useContext(AppContext);

  const adminMenu = [
    {
      label: "Operators",
      path: "/admin/operators",
      icon: <AssignmentIndIcon />,
    },
    {
      label: "Products",
      path: "/admin/products",
      icon: <Inventory2Icon />,
    },
    {
      label: "Categories",
      path: "/admin/categories",
      icon: <ListIcon />,
    },
    {
      label: "Profile",
      path: "/admin/profile",
      icon: <PersonIcon />,
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const handelLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      sessionStorage.clear();
      setIsLogged(false);
      setToken(null);
      message.success("Logged out successfully");
      navigate("/");
    }
  };
  return (
    <div className={`d-flex`}>
      <div
        className={`sidebar d-flex  flex-column gap-5 p-3 ${
          isSidebarOpen ? "sidebar-open" : "small"
        }`}
      >
        <div className="d-flex justify-content-start text-dark flex-column">
          {/* <img src={HomeIconW} alt="icon" height={50} width={50} /> */}
          {/* <p>{user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User"}</p> */}
        </div>
        <div className="d-flex justify-content-center flex-column gap-5">
          <Link
            className={`sidenav-item shadow rounded-3 border-3 ${
              location.pathname === "/admin/dashboard" ? "active" : "inactive"
            }`}
            to="/admin/dashboard"
          >
            <HomeIcon />
            {isSidebarOpen && "Home"}
          </Link>
          {adminMenu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`sidenav-item shadow rounded-3 border-3 ${
                location.pathname === item.path ? "active" : "inactive"
              }`}
            >
              {item.icon}
              {isSidebarOpen && item.label}
            </Link>
          ))}
          <Link
            className={`sidenav-item shadow rounded-3 border-3 inactive`}
            onClick={handelLogout}
            to="/"
          >
            <ExitToAppIcon />
            {isSidebarOpen && "Logout"}
          </Link>
        </div>
      </div>
      <div className={`main-content p-3 w-100 ${isSidebarOpen ? "" : ""}`}>
        <Topbar
          user={userData}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="card p-3 mt-3 h-100">{children}</div>
      </div>
    </div>
  );
}

export default SideNav;
