import { Button, Card, Tooltip } from "antd";
import NorthIcon from "@mui/icons-material/North";
import MoneyIcon from "@mui/icons-material/Money";
import PaymentsIcon from "@mui/icons-material/Payments";
import CloseIcon from "@mui/icons-material/Close";
import SouthIcon from "@mui/icons-material/South";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentIcon from "@mui/icons-material/Payment";
import { SearchOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { AppContext } from "../../AppContext";

function Payment() {
  const { isLogged, setIsLogged, goToPayment, setGoToPayment } = useContext(AppContext)

  return (
    <div className="home-main payment-section p-2 bg-ui">
      <div className="">
        <h1 className="text-primary">
          <b>PAYMENT</b>
        </h1>
        <hr />
        <h3 className="text-success">
          <b>PAY: 123.43</b>
        </h3>
        <div className="d-flex mt-4 gap-3">
          <div className=" d-flex justify-content-center flex-column gap-3">
            <Tooltip title="Cash Payment">
              <button className="px-4 p-3 btn btn-success text-nowrap">
                <MoneyIcon /> Cash
              </button>
            </Tooltip>
            <Tooltip title="Online Payment">
              <button className="px-4 p-3 btn btn-success text-nowrap">
                <CreditCardIcon /> Online
              </button>
            </Tooltip>
            <Tooltip title="Cancel">
              <button className="px-4 p-3 btn btn-danger text-nowrap" onClick={()=>setGoToPayment(false)}>
                <CloseIcon /> Cancel
              </button>
            </Tooltip>
          </div>
          <div className="d-flex flex-column px-5">
            <h5>
              <b>Customer Mobile number</b>
            </h5>
            <input
              className="form-control mb-2"
              placeholder="Enter mobile number"
            />

            <div className="d-flex flex-wrap gap-3 justify-content-between">
              {[1, 2, 3, "C", 4, 5, 6, "D", 7, 8, 9, "."].map(
                (button, index) => (
                  <button
                    key={index}
                    className={`btn btn-${
                      button === "C" || button === "D" ? "danger" : "primary"
                    } mr-2 mb-2 p-3`}
                    style={{ width: "calc(20% - 8px)" }}
                  >
                    <b>{button}</b>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <div className="south-section py-2 d-flex justify-content-end align-items-center px-5 ">
          <Tooltip title="Payment">
            <button className="px-4 p-3 btn btn-success">
              <PaymentsIcon /> Pay
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Payment;
