import React from "react";
import SideNav from "../SideNav/SideNav";
import { useParams } from "react-router-dom";
import { Tabs, message } from "antd";
import Spiner from "../../Loading/Spin";
import axios from "axios";
import { UserImage } from "../../../assets/image";
import OrdersList from "../Orders/OrdersList";
import OperatorOrderMade from "../Orders/OperatorOrderMade";
import ProfileOrdersAll from "../Orders/ProfileOrdersAll";

function OperatorProfile() {
  const { id } = useParams();
  const [operator, setOperator] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      fetchOperatorData();
    }
  }, [id]);

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



  return (
    <SideNav>
      <div className="admin-operators">
        {loading ? <Spiner /> : <ProfileOrdersAll operator={operator} />}
      </div>
    </SideNav>
  );
}

export default OperatorProfile;
