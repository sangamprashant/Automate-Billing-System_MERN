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
    const newUser = new userModel({faceId});
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

module.exports = {
  loginController,
  registerController,
};
