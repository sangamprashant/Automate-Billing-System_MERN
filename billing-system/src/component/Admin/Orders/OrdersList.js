import React from "react";
import { Table, message } from "antd";
import axios from "axios";
import { AppContext } from "../../../AppContext";
import { VisibilityIcon } from "../../../assets/icons";
import { Link } from "react-router-dom";
import Spiner from "../../Loading/Spin";

function OrdersList({ orderType, orderStatus }) {
  const { token } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [orderType, orderStatus, token]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/order/details/${orderType}/${orderStatus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        // message.success(response.data.message);
        setData(response.data.orders);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log("Error in fetching the orders", error);
      message.error(
        error.response.data.message || "Failed to fetch the orders"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <Table dataSource={data} columns={columns} style={{ height: "100%" }} />
      )}
    </>
  );
}

export default OrdersList;
