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
        <div style="border: 1px solid #ccc; padding: 20px; text-align: left;">
        <img src="https://raw.githubusercontent.com/sangamprashant/Automate-Billing-System_MERN/main/billing-system/public/logo.png" alt="Company Logo" style="width: 100%;">

        <p>Dear Recipient,</p>
        <p>Welcome to our company! We are excited to have you on board.</p>
        <p>Best regards,<br>Your Company Name</p>

        <!-- Social Links -->
        <div style="margin-top: 20px; text-align: center;">
            <div style="margin-top: 20px;">
                <a href="https://www.yourwebsite.com" target="_blank" style="text-decoration: none;">
                    <button style="padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Visit Our Website</button>
                </a>

                <!-- Download App Button -->
                <a href="https://www.yourappdownloadlink.com" target="_blank" style="text-decoration: none;">
                    <button style="margin-left: 10px; padding: 10px 20px; background-color: #28a745; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Download App</button>
                </a>
            </div>
            <hr>
            <div style=" gap: 10px; text-align: center;">
                <a href="https://www.instagram.com/" target="_blank" style="text-decoration: none; margin-right: 10px;">
                    <img src="https://www.freepnglogos.com/uploads/new-instagram-logo-with-transparent-background-9.png" alt="Instagram" style="width: 30px; height: 30px;">
                </a>
                <a href="https://www.instagram.com/" target="_blank" style="text-decoration: none; margin-right: 10px;">
                    <img src="https://raw.githubusercontent.com/sangamprashant/Academic_quries_question_paper_Next_JS/main/public/logo.png" alt="Instagram" style="width: 30px; height: 30px; object-fit: cover; border-radius: 10px">
                </a>
            </div>
        </div>
    </div>
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
