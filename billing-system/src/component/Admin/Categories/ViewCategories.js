import { Tooltip, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { DeleteIcon, VisibilityIcon } from "../../../assets/icons";
import { AppContext } from "../../../AppContext";
import axios from "axios";

function ViewCategories() {
  const { token, categories } = useContext(AppContext);

  const handleDeleteCategory = async (category) => {
    const isDelete = window.confirm(
      `Are you sure you want to delete the category: ${category.category}?`
    );

    if (isDelete) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/category/delete/${category._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          message.success(
            `Category "${category.category}" deleted successfully`
          );
          handleUploadCategory();
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        message.error(
          error?.response?.data?.message ||
            "Failed to delete the category. Please try again later."
        );
      }
    } else {
      message.success(`Deletion canceled for category: ${category.category}`);
    }
  };

  return (
    <>
      <h5>Category List</h5>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.category}</td>
                <td className="d-flex gap-2">
                  <Tooltip title={`Delete ${data.category}.`}>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => handleDeleteCategory(data)}
                    >
                      <DeleteIcon />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewCategories;
