import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import { VisibilityIcon } from "../../../assets/icons";
import { Tooltip } from "antd";
import AdminViewProduct from "./AdminViewProduct";
import AddProduct from "./AddProduct";

function AdminProduct() {
  const [frame, setFrame] = useState("all"); // Default to "all"

  const renderSelectedFrame = () => {
    switch (frame) {
      case "all":
        return <AdminViewProduct tableData={tableData} />;
      case "add":
        return <AddProduct />;
      default:
        return <AdminViewProduct tableData={tableData} />;
    }
  };

  const tableData = [
    {
      p_name: "item1",
      p_category: "groceries",
      p_price: "1.99",
      p_stock: "10",
    },
    {
      p_name: "item2",
      p_category: "fruits",
      p_price: "0.99",
      p_stock: "5",
    },
    {
      p_name: "item3",
      p_category: "vegetables",
      p_price: "2.49",
      p_stock: "8",
    },
    {
      p_name: "item4",
      p_category: "groceries",
      p_price: "3.99",
      p_stock: "15",
    },
    {
      p_name: "item5",
      p_category: "fruits",
      p_price: "1.49",
      p_stock: "12",
    },
    {
      p_name: "item6",
      p_category: "vegetables",
      p_price: "2.99",
      p_stock: "6",
    },
    {
      p_name: "item7",
      p_category: "groceries",
      p_price: "2.49",
      p_stock: "10",
    },
    {
      p_name: "item8",
      p_category: "fruits",
      p_price: "0.99",
      p_stock: "20",
    },
    {
      p_name: "item9",
      p_category: "vegetables",
      p_price: "1.99",
      p_stock: "18",
    },
    {
      p_name: "item10",
      p_category: "groceries",
      p_price: "4.99",
      p_stock: "7",
    },
  ];

  return (
    <SideNav>
      <div className="admin-operators">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="dashboard-title">Products</h1>
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
