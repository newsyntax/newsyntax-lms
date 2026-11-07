const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      default: "USER",
      enum: ["USER", "ADMIN", "TEACHER", "AUTHOR"],
    },
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const model = mongoose.model("User", schema);
module.exports = model;
