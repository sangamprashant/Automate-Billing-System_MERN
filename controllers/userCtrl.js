const userModel = require("../models/userModels");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const doctorModel = require("../models/doctorModel");
// const appointmentModel = require("../models/appointmentModel");
// const moment = require("moment");
//register callback
const registerController = async (req, res) => {
  try {
    const { faceId } = req.body;
    const newUser = new userModel({ faceId });
    await newUser.save();
    console.log(newUser);
    res.status(200).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ faceId: req.body.faceId });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    //     const isMatch = await bcrypt.compare(req.body.password, user.password);
    //     if (!isMatch) {
    //       return res
    //         .status(200)
    //         .send({ message: "Invlid EMail or Password", success: false });
    //     }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
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
    
    const operator = await userModel.findById(id)

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

module.exports = {
  loginController,
  registerController,
  userDataController,
  operatorsListController,
  operatorsProfile,
};
