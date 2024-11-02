/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String,
  instrument: String,
  admin: Boolean,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
