const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  faceId: {
    type: String,
    required: [true, "face id is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders: {
    type: Array,
    default: [],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
