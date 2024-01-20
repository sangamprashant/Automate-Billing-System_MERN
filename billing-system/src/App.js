import { Alert, Space, message } from "antd";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import { Home, Login } from "./component";
import { useState } from "react";
import { AppContext } from "./AppContext";

function App() {
  const [isLogged, setIsLogged] = useState(true);
  // home
  const [goToPayment, setGoToPayment] = useState(false);

  return (
    <AppContext.Provider
      value={{ isLogged, setIsLogged, goToPayment, setGoToPayment }}
    >
      {!isLogged ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </AppContext.Provider>
  );
}

export default App;
