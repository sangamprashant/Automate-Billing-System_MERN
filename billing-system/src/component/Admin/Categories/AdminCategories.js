import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import ViewCategories from "./ViewCategories";
import { ProductCategory } from "../Products/rawData";
import { Tooltip } from "antd";
import AddCategory from "./AddCategory";

function AdminProduct() {
  const [frame, setFrame] = useState("all"); // Default to "all"

  const renderSelectedFrame = () => {
    switch (frame) {
      case "all":
        return <ViewCategories tableData={ProductCategory} />;
      case "add":
        return <AddCategory />;
      default:
        return <ViewCategories tableData={ProductCategory} />;
    }
  };

  return (
    <SideNav>
      <div className="admin-operators">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="dashboard-title">Categories</h1>
          <div className="d-flex gap-3">
            <Tooltip title="View all products">
              <button
                className={`btn btn-${
                  frame === "all" ? "primary" : "outline-secondary"
                }`}
                onClick={() => setFrame("all")}
              >
                All
              </button>
            </Tooltip>
            <Tooltip title="Add a new product">
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

export default AdminProduct;
