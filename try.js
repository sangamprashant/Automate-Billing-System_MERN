const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/api/trial", (req, res) => {
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
    <style>
      body {
        font-family: "Arial", sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        background-color: #007bff;
        color: #fff;
        text-align: center;
        padding: 10px;
        border-radius: 8px 8px 0 0;
      }

      .body {
        padding: 20px;
      }

      .app-title {
        display: flex;
        gap: 10px;
        margin-bottom: 5px;
      }
      .app-title > img {
        border-radius: 50px;
        border: 1px solid rgb(183, 183, 183);
      }

      .footer {
        text-align: center;
        padding: 10px;
        border-top: 1px solid #ccc;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      button {
        display: inline-block;
        margin: 5px;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Question Paper Uploaded</h2>
      </div>

      <div class="body">
        <div class="app-title">
          <img
            src="https://raw.githubusercontent.com/sangamprashant/Academic_quries_question_paper_Next_JS/main/public/logo.png"
            alt="logo"
            style="width: 50px; height: 50px; object-fit: cover"
          />
          <h1>Academic Queries</h1>
        </div>
        <img
          src="https://raw.githubusercontent.com/sangamprashant/Academic_quries_question_paper_Next_JS/main/public/logo%20aq.png"
          alt="Company Logo"
        />
        <p>
          Thank you for uploading the question paper. It has been received and
          will be reviewed shortly.
        </p>
        <p>Best regards,<br />Academic Queries</p>
        <p>
          <a href="https://www.academicqueries.me" target="_blank"
            ><button>Visit Our Website</button></a
          >
          <a href="https://www.amazon.com/your-app" target="_blank"
            ><button style="background-color: #28a745">
              Download from Amazon Appstore
            </button></a
          >
          <a href="https://drive.google.com/your-app" target="_blank"
            ><button style="background-color: #ff9800">
              Download from Google Drive
            </button></a
          >
        </p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Academic Queries. All rights reserved.</p>
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
});

module.exports = router;
