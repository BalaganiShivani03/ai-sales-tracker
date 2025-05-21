// backend/controllers/dealController.js
const Deal = require('../models/Deal');

exports.getDeals = async (req, res) => {
  const deals = await Deal.find();
  res.json(deals);
};

exports.createDeal = async (req, res) => {
  try {
    const newDeal = new Deal(req.body);
    const saved = await newDeal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateDeal = async (req, res) => {
  const updated = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
