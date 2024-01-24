import React, { useContext, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { AppContext } from "../../../AppContext";

function AddCategory() {
  const [category, setCategory] = useState("");
  const { token } = useContext(AppContext);

  const handleUploadCategory = async (e) => {
    e.preventDefault();
    if (!category.trim()) {
      return message.warning("Please enter a category.");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/category/create`,
        {
          category: category.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCategory("");
        message.success(response.data.message);
      } else {
        message.success(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading category:", error);
      message.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <h5>Add A Category</h5>
      <form>
        <div className="row">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Category title"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary w-100"
              onClick={handleUploadCategory}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddCategory;
