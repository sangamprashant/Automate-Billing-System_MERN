import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import faceIO from "@faceio/fiojs";
import { useNavigate } from "react-router-dom";
import { handleError } from "./errorByFACEID";
import { AppContext } from "../../AppContext";
import { BannerImg } from "../../assets/image";
import "./Authentication.css";

const fio = new faceIO(process.env.REACT_APP_PUBLIC_ID);

function Login() {
  const { token, setToken, isLogged, setIsLogged } = useContext(AppContext);
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(5); // Initial countdown time

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    return () => {
      if (fio && typeof fio.destroy === "function") {
        fio.destroy();
      }
      clearInterval(timer);
    };
  }, [fio]);

  useEffect(() => {
    if (countdown === 0) {
      // Start face recognition when countdown reaches 0
      handleLogIn();
    }
  }, [countdown]);

  const handleLogIn = async () => {
    try {
      let response = await fio.authenticate({
        locale: "auto",
      });
      if (response) {
        handelDbLogin(response?.facialId);
      }
    } catch (error) {
      message.error(handleError(error));
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
        navigate("/");
      } else {
        message.error(loginResponse?.data?.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      message.error(error.response.data.message);
    }
  };

  const handelReload = () => {
    fio.restartSession();
    setCountdown(5);
  };

  return (
    <div className="main-container">
      <form className="form border shadow p-5 col-md-7">
        <h2 className="text-center mb-3">
          WELCOME TO <br /> OUR AUTOMATIC BILLING SYSTEM
        </h2>
        <div className="row align-items-center">
          <div className="col-md-4">
            <img src={BannerImg} width="100%" alt="Banner" />
          </div>
          <div className="col-md-8">
            <ul>
              <li>
                Revolutionizing billing systems with MERN, faceIO, Firebase, and
                Twilio.
              </li>
              <li>
                Automated face authentication and QR scanner for seamless
                payments.
              </li>
              <li>
                Integration with Razorpay for quick and efficient transactions.
              </li>
              <li>
                Real-time bills sent via email and SMS for your convenience.
              </li>
            </ul>
          </div>
        </div>
        <hr className="line-bold" />
        <p className="text-center text-success">
          Opening the face recognition window in {countdown} seconds...
        </p>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="shadow btn btn-primary px-5 mt-4"
            onClick={handleLogIn}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
