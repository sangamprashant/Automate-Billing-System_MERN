import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { message } from "antd";
import axios from "axios";

function Scanner({
  scanResult,
  setScanResult,
  isScannerOpen,
  setIsScannerOpen,
  selectedProducts,
  setSelectedProducts,
}) {
  const scannerRef = React.useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 60,
      },
      []
    );

    scanner.render(onSuccess, onError);

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [isScannerOpen]);

  function onSuccess(qrCodeMessage) {
    setScanResult(qrCodeMessage);
  }

  function onError(errorMessage) {
    console.warn(errorMessage);
  }

  React.useEffect(() => {
    if (scanResult) {
      getProductData();
    }
    console.log(scanResult)
  }, [scanResult]);

  const getProductData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/product/scan`,
        {
          id: scanResult,
        }
      );
      if (response.data.success) {
        handleProductSelect(response.data.data);
      }
    } catch (error) {
      console.log("failed to fetch the product", error);
      message.error(error?.response?.data?.message || "Something went wrong.");
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
    scannerRef.current.clear();
    setIsScannerOpen(false);
  };

  return (
    <div className="profile-web-cam-container  ">
      <div className="bg-white p-2 rounded-3 shadow col-md-4">
        <div id="reader"/>
        <div className="mt-4">
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              setIsScannerOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
