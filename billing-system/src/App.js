import { Alert, Space, message } from "antd";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import { Home, Login } from "./component";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      {!isLogged ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </>
  );
}

export default App;
