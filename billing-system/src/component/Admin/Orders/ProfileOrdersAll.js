import React from "react";
import OperatorOrderMade from "./OperatorOrderMade";
import { UserImage } from "../../../assets/image";
import { Tabs } from "antd";
import axios from "axios";

function ProfileOrdersAll({ operator, isAdmin }) {
  const [orders, setOrders] = React.useState(null);

  React.useEffect(() => {
    if (operator) {
      fetchOperatorsOrders();
    }
  }, [operator]);

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
  const onlineSuccessOrders = orders?.filter(
    (order) => order.paymentMode === "online" && order.orderStatus === "success"
  );
  const onlinePendingOrders = orders?.filter(
    (order) => order.paymentMode === "online" && order.orderStatus === "pending"
  );
  const cashSuccessOrders = orders?.filter(
    (order) => order.paymentMode === "cash" && order.orderStatus === "success"
  );

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
    <React.Fragment>
      {operator ? (
        <React.Fragment>
          {!isAdmin && (
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="dashboard-title">{operator.name}'s Profile</h1>
            </div>
          )}
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
  );
}

export default ProfileOrdersAll;
