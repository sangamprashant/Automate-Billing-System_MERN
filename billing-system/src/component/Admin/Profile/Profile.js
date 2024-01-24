import React from "react";
import { UserImage } from "../../../assets/image";

function Profile() {
  return (
    <>
      <h5>Profile</h5>
      <div className="card p-3">
        <div className="row align-items-center">
          <div className="col-md-4 d-flex justify-content-center">
            <img src={UserImage} width={"200"} />
          </div>
          <div className="col-md-8">
            <h4>
              <b>Name:</b>Prashant Srivastav
            </h4>
            <p>
              <b>email:</b>Prashant.Srivastav@gmail.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
