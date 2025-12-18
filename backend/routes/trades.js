const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const trades = await db.query("SELECT * FROM trades ORDER BY created_at DESC");
  res.json(trades.rows);
});

export default router;
