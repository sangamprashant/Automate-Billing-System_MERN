import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { UserImage } from "../../assets/image";

function ProfileCard() {
  const { userData } = useContext(AppContext);
  return (
    <div className="container main-container">
      <div className="card border-0 shadow">
        <div className="card-body p-4">
          {userData && (
            <div className="row align-items-center">
              <div className="col-md-4 text-center w-100">
                <img
                  className="rounded-circle object-fit-cover"
                  src={userData.image ? userData.image : UserImage}
                  alt="Profile pic"
                  width={200}
                  height={200}
                />
              </div>
              <div className="col-md-8 w-100">
                {userData.name && (
                  <h2 className="mb-3">
                    <b>Name:</b> <i>{userData.name}</i>
                  </h2>
                )}
                {userData.email && (
                  <p className="mb-2">
                    <b>Email:</b> <i>{userData.email}</i>
                  </p>
                )}
                <p className="mb-2">
                  <b>Role:</b> <i>{userData.isAdmin ? "Admin" : "Operator"}</i>
                </p>
                <Link
                  to={userData.isAdmin ? "/admin/dashboard" : "/store"}
                  className="btn btn-primary w-100"
                >
                  Continue to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
