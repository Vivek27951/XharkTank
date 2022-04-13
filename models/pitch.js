const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
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

const pitchSchema = new mongoose.Schema({
  entrepreneur: {
    type: String,
    required: true,
  },
  pitchTitle: {
    type: String,
    required: true,
  },
  pitchIdea: {
    type: String,
    required: true,
  },
  askAmount: {
    type: Number,
    required: true,
  },
  equity: {
    type: Number,
    required: true,
  },
  offers: [offerSchema],
});

const Offer = mongoose.model("Offer", offerSchema);
const Pitch = mongoose.model("Pitch", pitchSchema);

module.exports = {
  Pitch,
  Offer,
};
