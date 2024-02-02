import React from "react";
import SideNav from "../SideNav/SideNav";
import { Tabs } from "antd";
import OrdersList from "./OrdersList";

function Orders() {
  const items = [
    {
      key: "1",
      label: "Cash",
      children: <OrdersList orderType={"cash"} orderStatus="success" />,
    },
    {
      key: "2",
      label: "Online",
      children: <OrdersList orderType={"online"} orderStatus="success" />,
    },
    {
      key: "3",
      label: "Pending",
      children: <OrdersList orderType={"online"} orderStatus="pending" />,
    },
  ];
  return (
    <SideNav>
      <div className="admin-operators">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="dashboard-title">Orders</h1>
        </div>
        <Tabs centered defaultActiveKey="1" items={items} />
      </div>
    </SideNav>
  );
}

export default Orders;
