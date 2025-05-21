// backend/routes/dealRoutes.js
const express = require('express');
const router = express.Router();
const { getDeals, createDeal, updateDeal } = require('../controllers/dealController');

router.get('/', getDeals);
router.post('/', createDeal);
router.put('/:id', updateDeal);

module.exports = router;
