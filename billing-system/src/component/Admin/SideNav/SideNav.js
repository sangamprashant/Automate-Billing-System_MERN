import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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
  LocalOfferIcon,
  PersonIcon,
  ShoppingCartOutlinedIcon,
  StorefrontIcon,
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
      label: "orders",
      path: "/admin/orders",
      icon: <LocalOfferIcon />,
    },
    {
      label: "Store",
      path: "/store",
      icon: <StorefrontIcon />,
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
    <div className={`d-flex h-100`}>
      <div
        className={`sidebar d-flex  flex-column gap-5 p-3 ${
          isSidebarOpen ? "sidebar-open" : "small"
        }`}
      >
        <div  className="sidenav-item  rounded-3 border-3  d-flex justify-content-start text-dark py-3 align-items-center">
          <ShoppingCartOutlinedIcon stroke="#8e19c7" size="20px" />
          {isSidebarOpen && (
            <b style={{ color: "#8e19c7", fontSize: "20px" }}>Dashbord</b>
          )}
        </div>
        <div className="d-flex justify-content-center flex-column gap-4">
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
        <div className="card side-card p-3 mt-3 h-100">{children}</div>
      </div>
    </div>
  );
}

export default SideNav;
