const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const model = mongoose.model("BanUser", schema);
module.exports = model;
