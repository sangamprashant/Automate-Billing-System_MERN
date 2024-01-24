import React, { useContext, useState } from "react";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { message } from "antd";
import { AppContext } from "../../../AppContext";
import axios from "axios";

function AddProduct() {
  const { token, categories } = useContext(AppContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [p_name, setPName] = useState("");
  const [p_stock, setPStock] = useState("");
  const [p_category, setPCategory] = useState("");
  const [p_price, setPPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedFile ||
      !p_name.trim() ||
      !p_stock.trim() ||
      !p_category.trim() ||
      !p_price.trim()
    ) {
      return message.warning("All fields are required");
    }
    // Additional validation for positive numbers
    const stockValue = parseInt(p_stock, 10);
    const priceValue = parseFloat(p_price);
    if (
      isNaN(stockValue) ||
      stockValue < 0 ||
      isNaN(priceValue) ||
      priceValue < 0
    ) {
      return message.warning("Stock and Price must be positive numbers");
    }
    setLoading(true);
    const fileRef = ref(
      storage,
      `automate-billing-system/${Date.now() + selectedFile.name}`
    );
    uploadBytes(fileRef, selectedFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleUpload(url);
      });
    });
  };

  const handleUpload = async (url) => {
    const reqBody = {
      p_name: p_name.trim(),
      p_stock: p_stock.trim(),
      p_category: p_category.trim(),
      p_price: p_price.trim(),
      p_image: url,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/product/create`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        message.success(
          response.data.message || "Product uploaded successfully."
        );
         setImagePreview(null);
         setSelectedFile(null);
         setPName("");
         setPStock("");
         setPCategory("");
         setPPrice("");
      }
    } catch (error) {
      console.log("failde to upload product to data base:", error);
      message.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h5>Add a Product</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="productName">Name of product</label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="form-control"
              value={p_name}
              onChange={(e) => setPName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="productCategory">Category of product</label>
            <select
              id="productCategory"
              name="productCategory"
              className="form-control"
              value={p_category}
              onChange={(e) => setPCategory(e.target.value)}
            >
              <option>Select a category</option>
              {categories.map((data, index) => (
                <option key={index}>{data.category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="productPrice">Price of product</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              className="form-control"
              value={p_price}
              onChange={(e) => setPPrice(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="productStock">Stock of product</label>
            <input
              type="number"
              id="productStock"
              name="productStock"
              className="form-control"
              value={p_stock}
              onChange={(e) => setPStock(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="productImage">Image of product</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="w-100">Preview of product image</label>
            <img
              src={imagePreview || "preview"}
              alt="Preview"
              height={150}
              width={150}
              className="object-fit-cover d-flex justify-content-center"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {!loading?"Submit":"Please wait.."}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
