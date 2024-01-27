const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Orders = require("./models/orders");



const run = async (req, res) => {

    const data = await Orders.find()
    const order= data[0]
  // Create a nodemailer transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Construct the email message
  const mailOptions = {
    from: "project.message@gamil.com",
    to: "srivastavp891@gmail.com",
    subject: "Welcome to Our Company",
    html: `
    <html>
    <head>
      <title>gh</title>
      <style>
        body {
          margin: 0;
          font-family: "Arial", sans-serif;
          background-color: #f8f9fa;
        }
  
        :root {
          --bill-primary: rgb(0, 0, 220);
        }
  
        .bill-container {
          max-width: 900px;
          margin: auto;
          padding: 15px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
  
        .text-dark-blue {
          color: var(--bill-primary);
        }
  
        .bill-boundary {
          border: 5px solid #999eff;
          margin: 10px 0;
        }
  
        .bill-heading {
          font-size: 50px;
          text-align: left;
          margin-bottom: 10px;
        }
  
        .total-section {
          width: 100%;
          display: flex;
          align-items: end;
          justify-content: space-between;
          margin-top: 20px;
        }
        .d-flex {
          display: flex;
        }
        .justify-content-center {
          justify-content: center;
        }
        .justify-content-between {
          justify-content: space-between;
        }
        .d-flex-justify-content-between {
          display: flex;
          justify-content: space-between;
        }
        .my-4 {
          margin: 10px 0;
        }
        .table {
          width: 100%;
          display: table;
          border-collapse: collapse;
        }
        .table th,
        .table td {
          padding: 5px;
        }
        .object-fit-contain {
          object-fit: contain;
        }
  
        th {
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="d-flex justify-content-center my-4">
        <div class="bill-container border shadow p-4">
          <div class="mt-5">
            <hr class="bill-boundary" />
            <h1 class="text-dark-blue bill-heading mb-4"><b style="color: #0000dc;">INVOICE</b></h1>
          </div>
          <table class="table">
            <tbody>
              <tr class="d-flex-justify-content-between">
                <td>
                  <div><b>BILLING SYSTEM</b></div>
                  <i>
                    <div>Tiwariganj, Lucknow</div>
                    <div>email.example.com</div>
                    <div class="mb-3">${process.env.REACT_APP_BASE_URL}</div>
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=http://localhost:3000/bill/65b43467701d3f747b8424dc"
                    />
                  </i>
                </td>
                <td>
                  <div><b>BILLED TO</b></div>
                  <i>
                    <div>${order.customerName}</div>
                    <div>${order.customerMobileNumber}</div>
                    <div>${order.customerEmail}</div>
                    <div><b>Payment mode:</b> ${order.paymentMode}</div>
                    <div><b>Invoice Number</b>: ${order.orderId}</div>
                    <div><b>Issued Date</b>: 27/12/2000</div>
                  </i>
                </td>
              </tr>
            </tbody>
          </table>
  
          <div class="product-list">
            <table class="table">
              <thead style="background: #0000dc">
                <tr class="text-white">
                  <th>Sr.no</th>
                  <th>Product Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order?.orderDetails?.productsDetails.map((product, index ) => (
                `${product._id&& `
                <tr key="${product._id}">
                  <td>${index + 1}</td>
                  <td>
                    <img
                      src="${product.p_image}"
                      alt="product image"
                      width="50"
                      height="50"
                      class="object-fit-contain"
                    />
                  </td>
                  <td>${product.p_name}</td>
                  <td>${product.p_count}</td>
                  <td>${product.p_price}</td>
                  <td>${product.p_total}</td>
                </tr>
                `}` ))}
              </tbody>
            </table>
          </div>
          <hr class="bill-boundary" />
          <div class="total-section">
            <div>
              <h1 class="text-dark-blue">THANK YOU FOR YOUR BUSINESS</h1>
            </div>
            <div>
              <div>
                <strong>Total Amount:</strong>
                ${(order.orderDetails.selectItemsTotal).toFixed(2)}
              </div>
              <div>
                <strong>Disc%PU:</strong>
                ${(order.orderDetails.discountPercentagePerUnit).toFixed(2)}
              </div>
              <div>
                <strong>Dics Amt PU:</strong>
                ${(order.orderDetails.discountAmountPerUnit).toFixed(2)}
              </div>
              <div>
                <strong>Overall Disc Amt:</strong>
                ${(order.orderDetails.totalDiscountGivenInOverall).toFixed(2)}
              </div>
              <div>
                <strong>Total Discount:</strong>
                ${(order.orderDetails.calculatedTotalDiscountOfAllDiscount).toFixed(2)}
              </div>
              <div>
                <strong>Total Amount Paid:</strong>
                ${(order.orderDetails.selectItemsTotal -
                order.orderDetails.calculatedTotalDiscountOfAllDiscount).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
};

// run()

module.exports = router;
