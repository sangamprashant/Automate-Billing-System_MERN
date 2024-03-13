const express = require("express");
const {
  loginController,
  userDataController,
  operatorsListController,
  operatorsProfile,
  emailCheck,
  userProfileUpdate,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//EMAIL || POST
router.post("/email", emailCheck);

//LOGIN || POST
router.post("/login", loginController);

//USER DATA || GET
router.get("/data", authMiddleware, userDataController);

// OPERATORS LIST ||GET
router.get("/opertatos/:type", operatorsListController);

// OPERATORS PROFILE by id || GET
router.get("/operator-profile/:id", operatorsProfile);

//USERPROFILEUPDATE || POST
router.post("/update", userProfileUpdate)

module.exports = router;
