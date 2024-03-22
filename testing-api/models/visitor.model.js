const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    full_name: String,
    address: String,
    phone_number: String,
    queue_number: {
        type: Number,
        default: 1
    }
  },
  {
    timestamps: true,
  }
);

mongoose.set("strictQuery", false);
const Visitors = mongoose.model("Visitors", userSchema);

module.exports = Visitors;