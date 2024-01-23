import { Alert, Space, message } from "antd";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import { Home, Login, Register, Welcome } from "./component";
import { useState } from "react";
import { AppContext } from "./AppContext";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(token ? true : false);
  // home
  const [goToPayment, setGoToPayment] = useState(false);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        isLogged,
        setIsLogged,
        goToPayment,
        setGoToPayment,
      }}
    >
      {!isLogged ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          {/* <Route path="/" element={<Register />} /> */}
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/store" element={<Home />} />
        </Routes>
      )}
    </AppContext.Provider>
  );
}

export default App;
