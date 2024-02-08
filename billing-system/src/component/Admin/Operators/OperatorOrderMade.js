import React from "react";
import { Table, message } from "antd";
import axios from "axios";
import { AppContext } from "../../../AppContext";
import { VisibilityIcon } from "../../../assets/icons";
import { Link } from "react-router-dom";
import Spiner from "../../Loading/Spin";

function OperatorOrderMade({ data }) {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Mobile Number",
      dataIndex: "customerMobileNumber",
      key: "customerMobileNumber",
    },
    {
      title: "Total Amount",
      dataIndex: "orderDetails",
      key: "totalAmount",
      render: (orderDetails) => <p>{orderDetails.selectItemsTotal}</p>,
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: "Products",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => (
        <ul>
          {orderDetails?.productsDetails?.map((product) => (
            <li key={product.p_id}>
              {/* <img src={product.p_image} height={50} width={50} className="object-fit-contain"/> */}
              {product.p_name} <br /> <b>Quantity:</b> {product.p_count}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "View Order",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Link className="btn btn-primary" to={`/bill/${_id}`}>
          <VisibilityIcon />
        </Link>
      ),
    },
  ];

  return (
    <Table dataSource={data} columns={columns} style={{ height: "100%" }} />
  );
}

export default OperatorOrderMade;
