import { Tooltip, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { VisibilityIcon } from "../../../assets/icons";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import Spiner from "../../Loading/Spin";

function AdminViewProduct({ tableData }) {
  const { token } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/product/get/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error(
        error?.response?.data?.message ||
          "Something went wron while fetching the products"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h5>Products List</h5>
      {isLoading ? (
        <Spiner />
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Product image</th>
              <th>Barcode</th>
              <th>Name of Product</th>
              <th>Category </th>
              <th>Stock </th>
              <th>Price </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={data.p_image}
                    width={100}
                    height={100}
                    className="object-fit-contain"
                    loading="lazy"
                  />
                </td>
                <td>{data.p_id}</td>
                <td>{data.p_name}</td>
                <td>{data.p_category}</td>
                <td>{data.p_stock}</td>
                <td>{data.p_price}</td>
                <td>
                  <Tooltip title={`View ${data.p_name}'s details.`}>
                    <button className="btn btn-primary mr-2">
                      <VisibilityIcon />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminViewProduct;
