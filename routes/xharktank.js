const express = require("express");
const router = express.Router();
const { Pitch, Offer } = require("../models/pitch");

//get all pitch
router.get("/pitches", async (req, res) => {
  try {
    const pitchs = await Pitch.find();
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
  const pitch = new Pitch({
    entrepreneur: req.body.entrepreneur,
    pitchTitle: req.body.pitchTitle,
    pitchIdea: req.body.pitchIdea,
    askAmount: req.body.askAmount,
    equity: req.body.equity,
  });
  try {
    const newPitch = await pitch.save();
    res.status(201).json(newPitch);
  } catch (err) {
    res.status(400).json({ message: req.body });
  }
});

//post offer for a pitch
router.post("/pitches/:id/makeOffer", getPitch, async (req, res) => {
  const findPitch = res.pitch;
  const offer = new Offer({
    investor: req.body.investor,
    amount: req.body.amount,
    equity: req.body.equity,
    comment: req.body.comment,
  });
  try {
    const newOffer = await offer.save();
    findPitch.offers.push(newOffer);
    await findPitch.save();
    // res.status(201).json(findPitch);
    // const newPitch = await pitch.save();
    res.status(201).json(newPitch);
    // res.status(201).json({ message: offer });
  } catch (err) {
    res.status(400).json({ message: "Invalid Request Body!" });
  }
});

async function getPitch(req, res, next) {
  let pitch;
  try {
    pitch = await Pitch.findById(req.params.id);
    if (pitch == null) {
      return res.status(404).json({ message: "cannot find the Pitch" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pitch = pitch;
  next();
}

module.exports = router;
