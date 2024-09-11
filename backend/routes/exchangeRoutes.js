const express = require("express");
const {
  createExchangeRequest,
  respondToRequest,
  getExchangeRequests,
} = require("../controllers/exchangeController");
const router = express.Router();

router.post("/request", createExchangeRequest);
router.put("/respond", respondToRequest);
router.get("/requests", getExchangeRequests);

module.exports = router;
