const mongoose = require("mongoose");
Schema = mongoose.Schema;

var DetailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  address: { type: String },
});

const Detail = mongoose.model("Detail", DetailSchema);

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null, require: true },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Detail",
    },
  ],
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User, Detail };
