import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Tooltip } from "antd";
import NorthIcon from "@mui/icons-material/North";
import LogoutIcon from "@mui/icons-material/Logout";
import SouthIcon from "@mui/icons-material/South";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { SearchOutlined } from "@ant-design/icons";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

function ProductSection({
  productByCategory,
  categorySelected,
  selectedProducts,
  setSelectedProducts,
  scrollIndex,
  setScrollIndex
}) {
  const { setToken, isLogged, setIsLogged, goToPayment, setGoToPayment } =
    useContext(AppContext);

  React.useEffect(() => {
    setScrollIndex(0);
  }, [categorySelected,productByCategory]);

  const handleGoToPayment = () => {
    console.log("Pay button is clicked");
    setGoToPayment(true);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLogged(false);
    setToken("");
    window.location.href = "/";
  };

  const handleScroll = (index) => {
    const targetElement = document.getElementById(`product-item-${index}`);
    setScrollIndex(index);
    if (targetElement) {
      try {
        targetElement.scrollIntoView({ behavior: "smooth" });
        console.log(`Scrolling to product item ${index} initiated.`);
      } catch (error) {
        console.error("Scrolling failed:", error);
      }
    } else {
      let temp = 0;
      if (index <= 0) {
        temp = 0;
        setScrollIndex(0);
      } else {
        temp = productByCategory.length - 1;
        setScrollIndex(productByCategory.length - 1);
      }
      document
        .getElementById(`product-item-${temp}`)
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find((p) => p._id === product._id);

    if (existingProduct) {
      // If the product is already selected, update the count and total
      const updatedProducts = selectedProducts.map((p) =>
        p._id === existingProduct._id
          ? {
              ...p,
              p_count: p.p_count + 1,
              p_total: (p.p_count + 1) * p.p_price,
            }
          : p
      );
      setSelectedProducts(updatedProducts);
    } else {
      // If the product is not selected, add it to the array
      const newProduct = {
        _id: product._id,
        p_id: product.p_id,
        p_name: product.p_name,
        p_price: product.p_price,
        p_image: product.p_image,
        p_count: 1,
        p_total: product.p_price,
      };
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  };

  return (
    <div className="home-main product-section p-2 bg-ui">
      {/* North Section */}
      <div className="north-section py-3 d-flex px-5 gap-4 justify-content-between">
        <div className="d-flex gap-3">
          <Button
            shape="round"
            icon={<NorthIcon />}
            size="large"
            type="primary"
            id="scrollTop"
            onClick={() => handleScroll(scrollIndex - 10)}
          />
          <h2>{categorySelected}</h2>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout <LogoutIcon />
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div
        className="product-section-scroll p-2 bg-white rounded"
        id="scrolling-section"
      >
        <div className="product-section-container">
          {productByCategory.map((item, index) => (
            <Card
              key={item._id}
              hoverable
              style={{
                width: 150,
                height: 200,
                margin: "0 10px 10px 0",
              }}
              cover={
                <img
                  width="120"
                  height="120"
                  className="object-fit-contain"
                  alt="example"
                  src={item.p_image}
                />
              }
              id={`product-item-${index}`}
              onClick={() => handleProductSelect(item)}
            >
              <Meta
                title={item.p_name}
                description={`₹${item.p_price}`}
                className="text-center"
              />
            </Card>
          ))}
        </div>
        {/* Add other buttons or components here */}
      </div>

      {/* South Section */}
      <div className="south-section py-2 d-flex justify-content-between align-items-center px-5">
        <Button
          id="scrollBottom"
          shape="round"
          icon={<SouthIcon />}
          size="large"
          type="primary"
          onClick={() => handleScroll(scrollIndex + 10)}
        />
        <Tooltip title="Payment" onClick={handleGoToPayment}>
          <button
            className={`px-4 p-3 btn btn-${
              !selectedProducts.length > 0 ? "danger" : "success"
            }`}
            disabled={selectedProducts.length > 0 ? false : true}
          >
            <CurrencyRupeeIcon /> Pay
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default ProductSection;
