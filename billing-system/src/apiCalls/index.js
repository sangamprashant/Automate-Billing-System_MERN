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

//getting all catagories...
const handleGetCategory = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/category/get`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      return response.data.categories;
    }
  } catch (error) {
    console.error("Error getting category:", error);
    message.error(error?.response?.data?.message);
    return null;
  }
};

export { fetchUserData, handleGetCategory };
