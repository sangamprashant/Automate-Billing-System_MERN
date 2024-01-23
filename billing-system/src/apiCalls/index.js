import { message } from "antd";
import axios from "axios";

const fetchUserData = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/user/data`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("failed to fetch the user details:", error);
    message.error("server error");
    return null;
  }
};

export { fetchUserData };
