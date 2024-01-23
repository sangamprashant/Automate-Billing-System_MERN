import { Alert, Space, message } from "antd";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import {
  AdminCategories,
  AdminDashboard,
  AdminOperators,
  AdminProduct,
  Home,
  Loading,
  Login,
  Register,
  Welcome,
} from "./component";
import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { fetchUserData } from "./apiCalls";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(token ? true : false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  // home
  const [goToPayment, setGoToPayment] = useState(false);

  useEffect(() => {
    if (!userData) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      if (token && isLogged) {
        const data = await fetchUserData(token);
        console.log("data got:", data);
        setUserData(data);
      }
    };

    fetchData();
  }, [token, isLogged]);

  console.log("user data:", userData);

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
      }}
    >
      {!isLogged ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          {/* <Route path="/" element={<Register />} /> */}
        </Routes>
      ) : (
        <>
          <Loading />
          <Routes>
            <Route path="/" element={<Welcome />} />
            {/* operator */}
            <Route path="/store" element={<Home />} />
            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/operators" element={<AdminOperators />} />
            <Route path="/admin/products" element={<AdminProduct />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/profile" element={<AdminCategories />} />
          </Routes>
        </>
      )}
    </AppContext.Provider>
  );
}

export default App;
