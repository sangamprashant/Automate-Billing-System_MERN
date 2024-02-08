import React from "react";
import SideNav from "../SideNav/SideNav";
import { useParams } from "react-router-dom";
import { Tabs, message } from "antd";
import Spiner from "../../Loading/Spin";
import axios from "axios";
import { UserImage } from "../../../assets/image";
import OrdersList from "../Orders/OrdersList";
import OperatorOrderMade from "./OperatorOrderMade";

function OperatorProfile() {
  const { id } = useParams();
  const [operator, setOperator] = React.useState(null);
  const [orders, setOrders] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      fetchOperatorData();
    }
  }, [id]);

  React.useEffect(() => {
    if (operator) {
      fetchOperatorsOrders();
    }
  }, [operator]);

  const fetchOperatorData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/operator-profile/${id}`
      );
      if (response.data.success) {
        setOperator(response.data.operator);
      } else {
        message.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Failed to fetch the operator:", error);
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchOperatorsOrders = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/order/operator/order`,
      { ids: operator.orders }
    );
    if (response.data.success) {
      setOrders(response.data.orders);
    } else {
      message.error(response.data.message || "Something went wrong");
    }
    try {
    } catch (error) {
      console.log("Error in fetching orders:", error);
      message.error(error.response.data.message || "Something went wrong");
    }
  };

  // Categorize orders into "online cash-success" and "cash-pending"
  const onlineSuccessOrders = orders?.filter(order => order.paymentMode === "online" && order.orderStatus === "success");
  const onlinePendingOrders = orders?.filter(order => order.paymentMode === "online" && order.orderStatus === "pending");
  const cashSuccessOrders = orders?.filter(order => order.paymentMode === "cash" && order.orderStatus === "success");

  const items = [
    {
      key: "1",
      label: "Cash",
      children: <OperatorOrderMade data={cashSuccessOrders} />,
    },
    {
      key: "2",
      label: "Online",
      children: <OperatorOrderMade data={onlineSuccessOrders} />,
    },
    {
      key: "3",
      label: "Pending",
      children: <OperatorOrderMade data={onlinePendingOrders} />,
    },
  ];

  return (
    <SideNav>
      <div className="admin-operators">
        {loading ? (
          <Spiner />
        ) : (
          <React.Fragment>
            {operator ? (
              <React.Fragment>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="dashboard-title">{operator.name}'s Profile</h1>
                </div>
                <div className="card p-2">
                  <div className="row align-items-center">
                    <div className="col-md-6 d-flex justify-content-center">
                      <img
                        className="object-fit-cover"
                        src={operator.image || UserImage}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="col-md-6">
                      <h4>
                        <b>Name: </b>
                        {operator.name}
                      </h4>
                      <div className="text-muted">
                        <b>Email: </b>
                        {operator.email}
                      </div>
                      <div className="text-muted">
                        <b>Role: </b>
                        {operator.isAdmin ? "Admin" : "Operator"}
                      </div>
                    </div>
                  </div>
                  <hr />
                  {/* render the orders */}
                  <h5>Orders Made:</h5>
                  <Tabs centered defaultActiveKey="1" items={items} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>No Data Found</p>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </SideNav>
  );
}

export default OperatorProfile;
