import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import { VisibilityIcon } from "../../../assets/icons";
import { Tooltip } from "antd";
import AllOperators from "./AllOperators";
import AddOperator from "./AddOperator";

function AdminOperators() {
  const [frame, setFrame] = useState("all"); // Default to "all"

  const renderSelectedFrame = () => {
    switch (frame) {
      case "all":
        return <AllOperators tableData={tableData} />;
      case "add":
        return <AddOperator />;
      default:
        return <AllOperators tableData={tableData} />;
    }
  };

  const tableData = [
    { name: "somesh1", email: "somaes.opprator@gmail.com" },
    { name: "somesh2", email: "somaes.opprator@gmail.com" },
    { name: "somesh3", email: "somaes.opprator@gmail.com" },
    { name: "somesh4", email: "somaes.opprator@gmail.com" },
    { name: "somesh5", email: "somaes.opprator@gmail.com" },
  ];

  return (
    <SideNav>
      <div className="admin-operators">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="dashboard-title">Operators</h1>
          <div className="d-flex gap-3">
            <Tooltip title="View all operators">
              <button
                className={`btn btn-${
                  frame === "all" ? "primary" : "outline-secondary"
                }`}
                onClick={() => setFrame("all")}
              >
                All
              </button>
            </Tooltip>
            <Tooltip title="Add a new operator">
              <button
                className={`btn btn-${
                  frame === "add" ? "primary" : "outline-secondary"
                }`}
                onClick={() => setFrame("add")}
              >
                Add
              </button>
            </Tooltip>
          </div>
        </div>
        <hr className="mb-4" />
        {renderSelectedFrame()}
      </div>
    </SideNav>
  );
}

export default AdminOperators;
