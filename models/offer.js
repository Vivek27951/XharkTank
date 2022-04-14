const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  investor: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  equity: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Offer", offerSchema);
