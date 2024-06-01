const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const doctorModel = require("../models/doctorModel");
// const appointmentModel = require("../models/appointmentModel");
// const moment = require("moment");
//register callback

const emailCheck = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .send({ message: "User already registered", success: false });
    }
    res.status(200).send({
      message: "No email found, proseed with registration",
      success: true,
    });
  } catch (error) {
    console.log("Failed to fech user data", error);
    res
      .status(500)
      .send({ message: "Failed to fech user data", success: false });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!email.trim() || !password.trim())
      return res
        .status(400)
        .send({ message: "All fields are required.", success: false });

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "No user found with this email", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Invlid Email or Password", success: false });
    }
    const token = jwt.sign({user:{ _id: user._id }}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

// user data fetching
const userDataController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      res.status(200).json({
        success: false,
        message: `User not found.`,
      });
    }
    res.status(200).json({
      success: true,
      message: `User found.`,
      data: user,
    });
  } catch (error) {
    console.log("error in fetching user data:", error);
    res.status(500).json({
      success: false,
      message: `User Data Controller ${error.message}`,
    });
  }
};

const operatorsListController = async (req, res) => {
  try {
    const { type } = req.params;
    const query = type === "admin" ? true : false;

    const operators = await userModel.find({
      isAdmin: query,
    });

    res.status(200).json({
      success: true,
      message: "Operators found",
      operators: operators,
    });
  } catch (error) {
    console.log("Failed to fetch the operators:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the operators",
    });
  }
};

const operatorsProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const operator = await userModel.findById(id);

    res.status(200).json({
      success: true,
      message: "Operator found",
      operator: operator,
    });
  } catch (error) {
    console.log("Failed to fetch the operators:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the operator",
    });
  }
};

const userProfileUpdate = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const user = await userModel.findByIdAndUpdate(_id, updateData);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Failed to update the profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update the profile",
      error: error.message, // Send back the error message for debugging
    });
  }
};

module.exports = {
  loginController,
  userDataController,
  operatorsListController,
  operatorsProfile,
  emailCheck,
  userProfileUpdate,
};
