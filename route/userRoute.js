const express = require("express");
const {
  loginController,
  registerController,
  userDataController,
  operatorsListController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//USER DATA || GET
router.get("/data", authMiddleware, userDataController);

// OPERATORS LIST ||GET
router.get("/opertatos/:type", operatorsListController);

module.exports = router;
