import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import faceIO from "@faceio/fiojs";
import { useNavigate } from "react-router-dom";
import { handleError } from "./errorByFACEID";
import { AppContext } from "../../AppContext";

const fio = new faceIO(process.env.REACT_APP_PUBLIC_ID);

function Login() {
  const { token, setToken, isLogged, setIsLogged } = useContext(AppContext);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleEnroll = async () => {
    try {
      const response = await fio.enroll();
      message.success("face id created");
      console.log("REsponse from faceAPI", response);
      const dbBody = {
        faceId: response.facialId,
      };

      // Send enrollment data to backend for storage
      const dbREsponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/register`,
        dbBody
      );

      if (dbREsponse.status === 200) {
        console.log("Registered successfully");
      }
      console.log("Enrollment successful!");
      setIsEnrolling(false);
    } catch (error) {
      handleError(error);
      setError(error);
      setIsEnrolling(false);
    }
  };

  const handleLogIn = async () => {
    try {
      let response = await fio.authenticate({
        locale: "auto",
      });
      handelDbLogin(response.facialId)
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  };

  const handelDbLogin = async (facialId) => {
    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/login`,
        {
          faceId: facialId,
        }
      );
      console.log(loginResponse.data);
      if (loginResponse?.data?.success) {
        message.success(loginResponse?.data?.message);
        sessionStorage.setItem("token", loginResponse?.data?.token);
        setIsLogged(true);
        setToken(loginResponse.data.token);
        navigate("/")
      } else {
        message.error(loginResponse?.data?.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="main-container">
      <div className="">
        {isEnrolling ? (
          <div>Enrolling user...</div>
        ) : (
          <form className="form border shadow p-5">
            <h2 className="text-center mb-3">REGISTER</h2>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="shadow btn btn-primary px-5 w-100"
              onClick={handleEnroll}
            >
              Register
            </button>
            <button
              type="button"
              className="shadow btn btn-primary px-5 w-100 mt-4"
              onClick={handleLogIn}
            >
              Login
            </button>
          </form>
        )}
        {error && <div className="error-message">{error.message}</div>}
      </div>
    </div>
  );
}

export default Login;
