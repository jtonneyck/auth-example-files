const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String},
  password: { type: String },
  profilePicture: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"}
});

module.exports = mongoose.model("User", userSchema);
