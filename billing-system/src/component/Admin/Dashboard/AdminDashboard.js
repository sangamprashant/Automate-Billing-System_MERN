import React from "react";
import SideNav from "../SideNav/SideNav";
import { AssignmentIndIcon, Inventory2Icon } from "../../../assets/icons";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <SideNav>
      <div className="admin-dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <hr />
        <div className="dashboard-cards row mt-4">
          <div className="col-md-6 p-2">
            <div className="card p-4 text-center dashboard-card">
              <div className="icon-box">
                <AssignmentIndIcon className="dashboard-icon" color="primary" />
              </div>
              <h3 className="dashboard-value">23</h3>
              <h5 className="dashboard-label">Operators</h5>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="card p-4 text-center dashboard-card">
              <div className="icon-box">
                <Inventory2Icon className="dashboard-icon" color="primary" />
              </div>
              <h3 className="dashboard-value">23</h3>
              <h5 className="dashboard-label">Products</h5>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  );
}

export default AdminDashboard;
