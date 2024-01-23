import React from "react";
import { Link } from "react-router-dom";

function ProfileCard() {
  return (
    <div className="container main-container">
      <div className="card border-0 shadow">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <img
                className="rounded-circle"
                src="https://avatars.githubusercontent.com/u/93257774?v=4"
                alt="Profile pic"
                width={200}
                height={200}
              />
            </div>
            <div className="col-md-8">
              <h2 className="mb-3"><b>Name:</b> <i>Prashant Srivastava</i></h2>
              <p className="mb-2"><b>Email:</b> <i>srivastavp891@gmail.com</i></p>
              <p className="mb-2"><b>Role:</b> <i>Admin</i></p>
              <Link to="/store" className="btn btn-primary w-100">Continue to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
