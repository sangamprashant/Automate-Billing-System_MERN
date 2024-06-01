import { message } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import AddedItems from "./AddedItems";
import ButtonSection from "./ButtonSection";
import "./Home.css";
import Payment from "./Payment";
import ProductSection from "./ProductSection";
import Scanner from "./Scanner";

function Home() {
  const navigate = useNavigate()
  const {
    token,
    goToPayment,
    setGoToPayment,
    userData,
    categories,
  } = useContext(AppContext);
  const [categorySelected, setCategorySelected] = useState("");
  const [productByCategory, setProductByCategory] = useState([]);

  //selected product list
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductsHistory, setSelectedProductsHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  // Added Items
  const [discountPercentagePerUnit, setDiscountPercentagePerUnit] = useState(0.0);
  const [discountAmountPerUnit, setDiscountAmountPerUnit] = useState(0.0);
  const [totalDiscountGivenInOverall, setTotalDiscountGivenInOverall] = useState(0.0);
  const [calculatedTotalDiscountOfAllDiscount, setCalculatedTotalDiscountOfAllDiscount] = useState(0.0);
  const [selectItemsTotal,setSelectItemsTotal] = useState(0.0)
  const [qtyCount, setQtyCount] = useState(0);
  // payment 
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  //scanner 
  const [isScannerOpen,setIsScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState(null);

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
    setGoToPayment(false)
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

  const orderDetails = {
    salesMan:userData?._id,
    paymentMode:"cash",
    customerName:customerName,
    customerMobileNumber:mobileNumber,
    customerEmail:email,
    orderDetails:{
      productsDetails:selectedProducts,
      discountPercentagePerUnit, 
      discountAmountPerUnit, 
      totalDiscountGivenInOverall, 
      calculatedTotalDiscountOfAllDiscount, 
      selectItemsTotal,
    }
  }
  const handelCashPayment = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/cash/create`,orderDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(response.data.success){
        message.success(response.data.message || "Order created successfully")
        navigate(`/bill/${response.data.order._id}`)
        handleReset()
      }
      
    } catch (error) {
      console.log("Error in creating the order",error)
      message.error("failed to create the order")
    }
  }

  //loading the payment script:
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }
  const handelOnlinePayment = async () => {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/online/create`,orderDetails,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      // window.location.href=response?.data?.session?.url;
      const { amount, id: order_id, currency,receipt } = response.data.razorpayOrder;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: customerName,
        image: "https://raw.githubusercontent.com/sangamprashant/Automate-Billing-System_MERN/main/billing-system/public/icon.png",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            receipt:receipt,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/payment/success`, data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (result.data.success) {
            message.success(result.data.message || "Payment done.")
            navigate(`/bill/${receipt}`)
          }
        },
        prefill: {
          name: customerName,
          email: email,
          contact: mobileNumber,
        },
        theme: {
          color: "#000000",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    } catch (error) {
      console.log(error)
    }
  };

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
        setIsScannerOpen={setIsScannerOpen}
      />
      {!goToPayment ? (
        <>
          <ButtonSection
            categories={categories}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            setScrollIndex={setScrollIndex}
          />
          <ProductSection
            productByCategory={productByCategory}
            categorySelected={categorySelected}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            scrollIndex={scrollIndex}
            setScrollIndex={setScrollIndex}
          />
          {isScannerOpen&&<Scanner 
            setIsScannerOpen={setIsScannerOpen}
            isScannerOpen={isScannerOpen}
            scanResult={scanResult} 
            setScanResult={setScanResult}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />}
        </>
      ) : (
        <Payment 
          selectItemsTotal={selectItemsTotal} 
          calculatedTotalDiscountOfAllDiscount={calculatedTotalDiscountOfAllDiscount}
          handelCashPayment={handelCashPayment}
          handelOnlinePayment={handelOnlinePayment}
          customerName={customerName} 
          setCustomerName={setCustomerName}
          mobileNumber={mobileNumber} 
          setMobileNumber={setMobileNumber}
          email={email} 
          setEmail={setEmail}
          />
      )}
    </div>
  );
}

export default Home;
