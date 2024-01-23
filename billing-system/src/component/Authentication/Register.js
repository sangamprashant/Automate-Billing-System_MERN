import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import faceIO from "@faceio/fiojs";
import { handleError } from "./errorByFACEID";

const fio = new faceIO(process.env.REACT_APP_PUBLIC_ID);

function Register() {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleEnroll = async () => {
    if (!email) {
      return message.warning("All fielde are required");
    }
    setIsEnrolling(true);

    try {
      const response = await fio.enroll({
        payload: {
          email,
        },
      });
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

      // Handle successful enrollment on the frontend
      console.log("Enrollment successful!");
      setIsEnrolling(false);
      // Redirect to another page or display a success message
    } catch (error) {
      handleError(fio, error)
      setError(error);
      setIsEnrolling(false);
    }
  };

  const handleLogIn = async () => {
    try {
      let response = await fio.authenticate({
        locale: "auto",
      });
      console.log(response)
      console.log(` Unique Facial ID: ${response.facialId}
        PayLoad: ${response.payload}
        `);
    } catch (error) {
      handleError(fio,error)
      console.log(error);
    }
  };

  return (
    <div className="login-container">
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

export default Register;
