import React from "react";
import SideNav from "../SideNav/SideNav";
import { VisibilityIcon } from "../../../assets/icons";
import { Tooltip, message } from "antd";
import AllOperators from "./AllOperators";
import AddOperator from "./AddOperator";
import axios from "axios";

function AdminOperators() {
  const [frame, setFrame] = React.useState("all");
  const [tableData, setTableData] = React.useState([]);

  React.useLayoutEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/opertatos/operators`
      );
      if (response.data.success) {
        setTableData(response.data.operators);
      } else {
        message.error(response.data.message || "Failed to fetch the operators");
      }
    } catch (error) {
      console.log("failed to fetch the operators", error);
      message.error(error.response.data.message || "Server error");
    }
  };

  const renderSelectedFrame = () => {
    switch (frame) {
      case "all":
        return <AllOperators tableData={tableData} />;
      case "add":
        return <AddOperator setFrame={setFrame} fetchOperators={fetchOperators}/>;
      default:
        return <AllOperators tableData={tableData} />;
    }
  };

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
