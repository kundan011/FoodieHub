const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },

  customer: {
    name: String,
    phone: String,
    city: String,
    addressLine: String,
  },

  items: Array,

  totalAmount: Number,

  status: {
    type: String,
    default: "Preparing",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
