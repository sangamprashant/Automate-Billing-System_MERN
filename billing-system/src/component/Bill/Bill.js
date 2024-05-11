import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import "./Bill.css";
import { AppContext } from "../../AppContext";
import { BannerImg } from "../../assets/image";

function Bill() {
  const { userData } = useContext(AppContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  useEffect(() => {
    if (id) {
      fetchOrderData();
    }
  }, [id]);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/order/single/${id}`
      );
      if (response.data.success) {
        setOrder(response.data.order);
      }
    } catch (error) {}
  };

  const handleArrowButtonClick = () => {
    window.history.back();
  };

  return (
    <div className="d-flex justify-content-center my-4">
      {order && (
        <div className="bill-container border shadow bg-white p-4">
          {userData && (
            <button className="arrow-button" onClick={handleArrowButtonClick}>
              &#8592; Back
            </button>
          )}
          <div className="mt-5">
            <center>
              <img src={BannerImg} alt="" height={80} />
            </center>
            <hr className="bill-boundary" />
            <h1 className="text-dark-blue bill-heading mb-4">
              <b>INVOICE</b>
            </h1>
          </div>
          <div className="d-flex justify-content-between">
            {/* company side */}
            <div>
              <i>
                {currentURL && (
                  <QRCode value={currentURL} className="bg-transparent" />
                )}
              </i>
            </div>
            {/* customer side */}
            <div>
              {" "}
              <th>BILLED TO</th>
              <i>
                <div>{order.customerName}</div>
                <div>{order.customerMobileNumber}</div>
                <div>{order.customerEmail}</div>
                <div>
                  <b>Payment mode:</b> {order.paymentMode}
                </div>
                <div>
                  <b>Invoice Number</b> :{order.orderId}
                </div>
                <td>
                  <b>Issued Date</b>
                </td>
                <td>: {order.purchaseDate}</td>
              </i>
            </div>
          </div>
          <hr />
          <h3>Products Purchased</h3>
          <div className="product-list">
            <table
              className="table table-hover table-borderless"
              style={{ backgroundColor: "transparent" }}
            >
              <thead>
                <tr className="text-white" style={{ background: "#0000dc" }}>
                  <th>Sr.no</th>
                  <th>Product Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.orderDetails?.productsDetails.map((product, index) => (
                  <tr key={index} style={{ borderTop: "1px solid #e1e1e1" }}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.p_image}
                        alt="product image"
                        width={50}
                        height={50}
                        className="object-fit-contain"
                      />
                    </td>
                    <td>{product.p_name}</td>
                    <td>{product.p_count}</td>
                    <td>{product.p_price}</td>
                    <td>{product.p_total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <hr className="bill-boundary" />
          <div className="total-section">
            <div>
              <h1 className="text-dark-blue">THANK YOU FOR YOUR BUSINESS</h1>
            </div>
            <div>
              <div>
                <strong>Total Amount:</strong>{" "}
                {order.orderDetails.selectItemsTotal.toFixed(2)}
              </div>
              <hr className="bill-boundary" />
              <div>
                <strong>Disc%PU:</strong> %
                {order.orderDetails.discountPercentagePerUnit.toFixed(2)}
              </div>
              <div>
                <strong>Dics Amt PU:</strong> $
                {order.orderDetails.discountAmountPerUnit.toFixed(2)}
              </div>
              <div>
                <strong>Overall Disc Amt:</strong> $
                {order.orderDetails.totalDiscountGivenInOverall.toFixed(2)}
              </div>
              <div>
                <strong>Total Discount:</strong> $
                {order.orderDetails.calculatedTotalDiscountOfAllDiscount.toFixed(
                  2
                )}
              </div>
              <hr className="bill-boundary" />
              <div className="d-flex justify-content-end">
                <strong>Total Amount Paid:</strong> $
                {(
                  order.orderDetails.selectItemsTotal -
                  order.orderDetails.calculatedTotalDiscountOfAllDiscount
                ).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bill;
