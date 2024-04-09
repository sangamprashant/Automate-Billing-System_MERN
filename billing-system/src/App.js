import { Alert, Space, message } from "antd";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import {
  AdminCategories,
  AdminDashboard,
  AdminOperators,
  AdminProduct,
  AdminProfile,
  Bill,
  Home,
  Loading,
  Login,
  OperatorProfile,
  Orders,
  // Register,
  Welcome,
} from "./component";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./AppContext";
import { fetchUserData, handleGetCategory } from "./apiCalls";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(token ? true : false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  // home
  const [goToPayment, setGoToPayment] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!userData) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [userData]);
  useEffect(() => {
    if (token) {
      fetchCatogry();
    }
  }, [token]);

  const fetchCatogry = async () => {
    const data = await handleGetCategory(token);
    setCategories(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token && isLogged) {
        const data = await fetchUserData(token);
        setUserData(data);
      }
    };

    fetchData();
  }, [token, isLogged]);

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {!isLogged ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bill/:id" element={<Bill />} />
          <Route path="*" element={<Login />} />
          {/* <Route path="/" element={<Register />} /> */}
        </Routes>
      ) : (
        <>
          <Loading />
          <Routes>
            <Route path="/" element={<Welcome />} />
            {/* bill */}
            <Route path="/bill/:id" element={<Bill />} />
            {/* operator */}
            <Route path="/store" element={<Home />} />
            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/operators" element={<AdminOperators />} />
            <Route path="/admin/operators/:id" element={<OperatorProfile />} />
            <Route path="/admin/products" element={<AdminProduct />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Routes>
        </>
      )}
      <ToastContainer theme="dark" />
    </AppContext.Provider>
  );
}

export default App;
