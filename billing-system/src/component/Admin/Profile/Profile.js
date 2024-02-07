import React from "react";
import { UserImage } from "../../../assets/image";
import { AppContext } from "../../../AppContext";
import Spiner from "../../Loading/Spin";

function Profile() {
  const {
    token,
    setToken,
    isLogged,
    setIsLogged,
    goToPayment,
    setGoToPayment,
    isLoading,
    setIsLoading,
    userData,
    setUserData,
    categories,
    setCategories,
  } = React.useContext(AppContext);
  return (
    <>
      {userData ? (
        <>
          <h5>Profile</h5>
          <div className="card p-3">
            <div className="row align-items-center">
              <div className="col-md-4 d-flex justify-content-center">
                <img src={userData.image || UserImage} width={"200"} />
              </div>
              <div className="col-md-8">
                <h4>
                  <b>Name: </b>
                  {userData.name}
                </h4>
                <div className="text-muted">
                  <b>Email: </b>
                  {userData.email}
                </div>
                <div className="text-muted">
                  <b>Role: </b>
                  {userData.isAdmin ? "Admin" : "Operator"}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spiner />
      )}
    </>
  );
}

export default Profile;
