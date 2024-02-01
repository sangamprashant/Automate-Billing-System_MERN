import React from "react";
import SideNav from "../SideNav/SideNav";
import { AssignmentIndIcon, Inventory2Icon } from "../../../assets/icons";
import "./AdminDashboard.css";
import Clock from "./Clock";

function AdminDashboard() {
  return (
    <SideNav>
      <div className="admin-dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <hr />
        <div className="dashboard-cards row mt-4">
          <div className="col-md-4">
            <div className="d-flex justify-content-center ">
              <img width={300} height={300} className="object-fit-cover" />
            </div>
            <h4 className="mt-3">Profile</h4>
            <div>NAME NF</div>
            <div>rOLL</div>
            <div>smail</div>
          </div>
          <div className="col-md-8 p-2">
            <h1 className="mb-5">Welcome Admin,</h1>
            <Clock />
          </div>
        </div>
      </div>
    </SideNav>
  );
}

export default AdminDashboard;
