import React from "react";
import SideNav from "../SideNav/SideNav";
import "./AdminDashboard.css";
import Clock from "./Clock";
import { Spin, message } from "antd";
import axios from "axios";
import { AppContext } from "../../../AppContext";
import { UserImage } from "../../../assets/image";

function AdminDashboard() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderCount, setOrederCount] = React.useState([]);
  const { token, userData } = React.useContext(AppContext);

  React.useEffect(() => {
    if (token) {
      fetchCount();
    }
  }, [token]);

  const fetchCount = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/order/orderCounts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrederCount(response.data.count);
      } else {
        message.warning(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("failed to fetch the count", error);
      message.error(error.response.data.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SideNav>
      <div className="admin-dashboard">
        <h1 className="dashboard-title">Dashboard</h1>
        <hr />
        <div className="dashboard-cards row mt-4">
          <div className="col-md-4">
            <div className="d-flex justify-content-center ">
              <img
                width={300}
                height={300}
                className="object-fit-cover"
                src={userData?.image ? userData.image : UserImage}
              />
            </div>
            <h4 className="mt-3">Profile</h4>
            <table className="table w-100 table-borderless">
              <tbody>
                <tr className="text-capitalize">
                  <td>name</td>
                  <td>{userData?.name}</td>
                </tr>
                <tr>
                  <td className="text-capitalize">email</td>
                  <td>{userData?.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-8 p-2">
            <h1 className="mb-3 text-center">Welcome Admin,</h1>
            <div className="row align-items-center mt-5">
              <div className="col-md-6 d-flex justify-content-center">
                <Clock />
              </div>
              <div className="col-md-6">
                {isLoading ? (
                  <Spin tip="Loading.." size="large" className="mt-5">
                    <div className="content" />
                  </Spin>
                ) : (
                  <table className="table w-100">
                    <tbody>
                      {orderCount.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <li>
                              <b className=" text-capitalize">
                                {data._id.paymentMode} {data._id.orderStatus}
                              </b>
                            </li>
                          </td>
                          <td>{data.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  );
}

export default AdminDashboard;
