import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import ProductSection from "./ProductSection";
import ButtonSection from "./ButtonSection";
import AddedItems from "./AddedItems";
import Payment from "./Payment";
import { AppContext } from "../../AppContext";
import { message } from "antd";
import axios from "axios";

function Home() {
  const {
    token,
    setToken,
    isLogged,
    setIsLogged,
    goToPayment,
    setGoToPayment,
    isLoading,
    setIsLoading,
    userData,
    setUserData,
    categories,
    setCategories,
  } = useContext(AppContext);
  const [categorySelected, setCategorySelected] = useState("");
  const [productByCategory, setProductByCategory] = useState([]);

  //selected product list
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductsHistory, setSelectedProductsHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  // Added Items
  const [discountPercentagePerUnit, setDiscountPercentagePerUnit] = useState(0.0);
  const [discountAmountPerUnit, setDiscountAmountPerUnit] = useState(0.0);
  const [totalDiscountGivenInOverall, setTotalDiscountGivenInOverall] = useState(0.0);
  const [calculatedTotalDiscountOfAllDiscount, setCalculatedTotalDiscountOfAllDiscount] = useState(0.0);
  const [selectItemsTotal,setSelectItemsTotal] = useState(0.0)
  const [qtyCount, setQtyCount] = useState(0);

  useEffect(() => {
    // Save the current selected products to history
    setSelectedProductsHistory((prevHistory) => [
      ...prevHistory.slice(0, currentHistoryIndex + 1),
      selectedProducts,
    ]);
    setCurrentHistoryIndex((prevIndex) => prevIndex + 1);
  }, [selectedProducts]);

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex((prevIndex) => prevIndex - 1);
      setSelectedProducts(selectedProductsHistory[currentHistoryIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < selectedProductsHistory.length - 1) {
      setCurrentHistoryIndex((prevIndex) => {
        prevIndex + 1
        setSelectedProducts(selectedProductsHistory[prevIndex + 1]);
      });
    }
  };

  const handleReset = () => {
    // Reset all data
    setSelectedProducts([]);
    setSelectedProductsHistory([]);
    setCurrentHistoryIndex(0);
  };

  useEffect(() => {
    if (categories) {
      setCategorySelected(categories[0]?.category);
    }
  }, [categories]);

  useEffect(() => {
    if (categorySelected) {
      fetchProductsByCategory();
    }
  }, [categorySelected]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/product/category/${categorySelected}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setProductByCategory(response.data.products);
      }
    } catch (error) {
      console.log("failed to fetch the product by category:", error);
      message.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const handelCashPayment = () => {
    message.success("Cash Payment")
  }
  const handelOnlinePayment = () => {
    message.success("Online Payment")
  }

  return (
    <div className="d-flex bg-white">
      <AddedItems
        selectedProducts={selectedProducts}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleReset={handleReset}
        discountPercentagePerUnit={discountPercentagePerUnit} 
        setDiscountPercentagePerUnit={setDiscountPercentagePerUnit}
        discountAmountPerUnit={discountAmountPerUnit} 
        setDiscountAmountPerUnit={setDiscountAmountPerUnit}
        totalDiscountGivenInOverall={totalDiscountGivenInOverall} 
        setTotalDiscountGivenInOverall={setTotalDiscountGivenInOverall}
        calculatedTotalDiscountOfAllDiscount={calculatedTotalDiscountOfAllDiscount} 
        setCalculatedTotalDiscountOfAllDiscount={setCalculatedTotalDiscountOfAllDiscount}
        selectItemsTotal={selectItemsTotal} 
        setSelectItemsTotal={setSelectItemsTotal}
        qtyCount={qtyCount} 
        setQtyCount={setQtyCount}
      />
      {!goToPayment ? (
        <>
          <ButtonSection
            categories={categories}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
          />
          <ProductSection
            productByCategory={productByCategory}
            categorySelected={categorySelected}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </>
      ) : (
        <Payment 
          selectItemsTotal={selectItemsTotal} 
          calculatedTotalDiscountOfAllDiscount={calculatedTotalDiscountOfAllDiscount}
          handelCashPayment={handelCashPayment}
          handelOnlinePayment={handelOnlinePayment}
          />
      )}
    </div>
  );
}

export default Home;
