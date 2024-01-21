const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  faceId: {
    type: String,
    required: [true, "name is require"],
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
