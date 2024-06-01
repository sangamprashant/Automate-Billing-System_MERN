import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

const LoginEmailForm = () => {
  const { token, setToken, isLogged, setIsLogged, setIsLoading } =
    useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const LoginFunction = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.warning("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.warning("Password is required");
      return;
    }

    setIsLoading(true);

    const reqBody = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/login`,
        reqBody
      );
      if (response.data.success) {
        sessionStorage.setItem("token", response?.data?.token);
        setToken(response?.data?.token);
        setIsLogged(true);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.error({ error });
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <details className="container mt-5">
      <summary>Login Using Email & Password</summary>
      <form className="row mt-4" onSubmit={LoginFunction}>
        <div className="mb-3 col-md-4">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-3 col-md-4">
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </div>
      </form>
    </details>
  );
};

export default LoginEmailForm;
