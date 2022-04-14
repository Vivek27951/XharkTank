const express = require("express");
const router = express.Router();
const Pitch = require("../models/pitch");
const Offer = require("../models/offer");

//get all pitch
router.get("/pitches", async (req, res) => {
  try {
    const pitchs = await Pitch.find().select("-__v");
    pitchs.sort(function (a, b) {
      return b._id - a._id;
    });
    res.json(pitchs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get a single pitch
router.get("/pitches/:id", getPitch, async (req, res) => {
  try {
    res.json(res.pitch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//post a pitch
router.post("/pitches", async (req, res) => {
  let post_len;
  try {
    const pitchs = await Pitch.find();
    post_len = pitchs.length + 1;
    const pitch = new Pitch({
      _id: post_len.toString(),
      entrepreneur: req.body.entrepreneur,
      pitchTitle: req.body.pitchTitle,
      pitchIdea: req.body.pitchIdea,
      askAmount: req.body.askAmount,
      equity: req.body.equity,
    });
    try {
      const newPitch = await pitch.save();
      res.status(201).json({ id: newPitch._id });
    } catch (err) {
      res.status(400).json({ message: "Invalid Request Body" });
    }
  } catch (err) {
    res.status(400).json({ message: "no length" });
  }
});

//post offer for a pitch
router.post("/pitches/:id/makeOffer", getPitch, async (req, res) => {
  const findPitch = res.pitch;
  let offer_len = findPitch.offers.length + 1;
  const offer = new Offer({
    _id: offer_len.toString(),
    investor: req.body.investor,
    amount: req.body.amount,
    equity: req.body.equity,
    comment: req.body.comment,
  });
  try {
    findPitch.offers.push(offer);
    await findPitch.save();
    res.status(201).json({ id: offer._id }); //  if id is of offer || else change to pitch id
  } catch (err) {
    res.status(400).json({ message: "Invalid Request Body" });
  }
});

async function getPitch(req, res, next) {
  let pitch;
  try {
    let id = parseInt(req.params.id);
    pitch = await Pitch.findById(id).select("-__v");
    if (pitch == null) {
      return res.status(404).json({ message: "Pitch Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pitch = pitch;
  next();
}

module.exports = router;
