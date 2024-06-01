import React from "react";

const LoginEmailForm = () => {
  return (
    <details className="container mt-5">
      <summary className="">Login Using Email & Password</summary>

      <form className="row mt-4">
        <div className="mb-3 col-md-4">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3 col-md-4">
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
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
