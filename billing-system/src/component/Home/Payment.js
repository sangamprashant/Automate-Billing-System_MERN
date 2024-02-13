import React, { useContext, useState } from "react";
import { Tooltip } from "antd";
import MoneyIcon from "@mui/icons-material/Money";
import PaymentsIcon from "@mui/icons-material/Payments";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { AppContext } from "../../AppContext";

function Payment({
  selectItemsTotal,
  calculatedTotalDiscountOfAllDiscount,
  handelCashPayment,
  handelOnlinePayment,
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
  email,
  setEmail,
}) {
  const { isLogged, setIsLogged, goToPayment, setGoToPayment } =
    useContext(AppContext);

  const [activeField, setActiveField] = useState("name");
  const [paymentModeIs, setPaymentModeIs] = useState("");
  const isMobileValid = mobileNumber.length === 10;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNameValid = customerName.length > 0;

  const handleButtonClick = (button) => {
    switch (button) {
      case "C":
        clearActiveField();
        break;
      case "D":
        deleteLastDigit();
        break;
      default:
        handleInput(button);
        break;
    }
  };

  const clearActiveField = () => {
    switch (activeField) {
      case "mobile":
        setMobileNumber("");
        break;
      case "email":
        setEmail("");
        break;
      case "name":
        setCustomerName("");
        break;
      default:
        break;
    }
  };

  const deleteLastDigit = () => {
    switch (activeField) {
      case "mobile":
        setMobileNumber((prevValue) =>
          prevValue.length > 0 ? prevValue.slice(0, -1) : prevValue
        );
        break;
      case "email":
        setEmail((prevValue) =>
          prevValue.length > 0 ? prevValue.slice(0, -1) : prevValue
        );
        break;
      case "name":
        setCustomerName((prevValue) =>
          prevValue.length > 0 ? prevValue.slice(0, -1) : prevValue
        );
        break;
      default:
        break;
    }
  };

  const handleInput = (button) => {
    switch (activeField) {
      case "mobile":
        setMobileNumber((prevValue) => prevValue + button);
        break;
      case "email":
        setEmail((prevValue) => prevValue + button);
        break;
      case "name":
        setCustomerName((prevValue) => prevValue + button);
        break;
      default:
        break;
    }
  };

  const toggleActiveField = (field) => {
    setActiveField(field);
  };

  const qwertyKeyboard = [
    "1234567890",
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm.",
    "@",
    "CD ",
  ];

  const keyboardButtons = Array.from(qwertyKeyboard.join(""));

  return (
    <div className="home-main payment-section p-2 bg-ui">
      <div className="">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-primary">
            <b>PAYMENT</b>
          </h1>
          <h3 className="text-success">
            <b>
              PAY:{" "}
              {(
                selectItemsTotal - calculatedTotalDiscountOfAllDiscount
              ).toFixed(2)}
            </b>
          </h3>{" "}
        </div>

        <hr />
        <div className="d-flex mt-4 gap-3">
          <div className=" d-flex justify-content-center flex-column gap-3">
            <b
              style={{ margin: "0", padding: "0", fontSize: "14px" }}
              className={`text-${paymentModeIs ? "success" : "danger"}`}
            >
              {paymentModeIs === "cash"
                ? "Payment mode is Cash"
                : paymentModeIs === "online"
                ? "Payment mode is Online"
                : "Please select a payment mode"}
            </b>
            <Tooltip title="Cash Payment">
              <button
                className={`px-4 p-3 btn btn-${
                  paymentModeIs === "cash" ? "success" : "secondary"
                } text-nowrap`}
                onClick={() => setPaymentModeIs("cash")}
              >
                <MoneyIcon /> Cash
              </button>
            </Tooltip>
            <Tooltip title="Online Payment">
              <button
                className={`px-4 p-3 btn btn-${
                  paymentModeIs === "online" ? "success" : "secondary"
                } text-nowrap`}
                onClick={() => setPaymentModeIs("online")}
              >
                <CreditCardIcon /> Online
              </button>
            </Tooltip>
            <Tooltip title="Cancel">
              <button
                className="px-4 p-3 btn btn-danger text-nowrap"
                onClick={() => setGoToPayment(false)}
              >
                <CloseIcon /> Cancel
              </button>
            </Tooltip>
          </div>
          <div className="d-flex flex-column px-5">
            <h5>
              <b>Customer's Name</b>{" "}
              <sup className={`text-${isNameValid ? "success" : "danger"}`}>
                {isNameValid ? "Valid name" : "Please enter a name"}
              </sup>
            </h5>
            <div className="d-flex mb-2 gap-3">
              <input
                name="name"
                className="form-control"
                placeholder="Enter customer's name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                disabled={activeField !== "name"}
              />
              <button
                onClick={() => toggleActiveField("name")}
                className={`btn btn-${
                  activeField === "name" ? "outline-secondary" : "primary"
                } px-3`}
              >
                Name
              </button>
            </div>
            <h5>
              <b>Customer's Mobile Number</b>{" "}
              <sup className={`text-${isMobileValid ? "success" : "danger"}`}>
                {isMobileValid
                  ? "Valid number"
                  : "Please enter 10 digit mobile number"}
              </sup>
            </h5>
            <div className="d-flex mb-2 gap-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter mobile number"
                value={mobileNumber}
                disabled={activeField !== "mobile"}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <button
                onClick={() => toggleActiveField("mobile")}
                className={`btn btn-${
                  activeField === "mobile" ? "outline-secondary" : "primary"
                } px-3`}
              >
                Mobile
              </button>
            </div>
            <h5>
              <b>Customer's Email Id</b>{" "}
              <sup className={`text-${isEmailValid ? "success" : "danger"}`}>
                {isEmailValid ? "Valid email" : "Please enter a valid email"}
              </sup>
            </h5>
            <div className="d-flex mb-2 gap-3">
              <input
                className="form-control"
                placeholder="Enter email"
                value={email}
                disabled={activeField !== "email"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={() => toggleActiveField("email")}
                className={`btn btn-${
                  activeField === "email" ? "outline-secondary" : "primary"
                } px-4`}
              >
                Email
              </button>
            </div>
            <div>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {keyboardButtons.map((button, index) => (
                  <button
                    key={index}
                    className={`btn btn-${
                      button === "C" || button === "D"
                        ? "danger"
                        : button === "@" || button === "."
                        ? "success"
                        : "primary"
                    } mr-2 p-2`}
                    style={{
                      width:
                        button === " " ? "cal(100% - 16px)" : "calc(8% - 8px)",
                    }}
                    onClick={() => handleButtonClick(button)}
                    disabled={
                      activeField === "mobile" &&
                      (qwertyKeyboard[1].includes(button) ||
                        qwertyKeyboard[2].includes(button) ||
                        qwertyKeyboard[3].includes(button) ||
                        qwertyKeyboard[4].includes(button))
                    }
                  >
                    <b>{button === " " ? "Space-bar" : button}</b>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <div className="south-section py-2 d-flex justify-content-end align-items-center px-5 ">
          <Tooltip title="Payment">
            <button
              className={`px-4 p-3 btn btn-${
                paymentModeIs.trim() &&
                isEmailValid &&
                isMobileValid &&
                isNameValid
                  ? "success"
                  : "danger"
              }`}
              onClick={() => {
                paymentModeIs === "online"
                  ? handelOnlinePayment()
                  : handelCashPayment();
              }}
              disabled={
                paymentModeIs.trim() &&
                isEmailValid &&
                isMobileValid &&
                isNameValid
                  ? false
                  : true
              }
            >
              <PaymentsIcon /> Pay
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Payment;
