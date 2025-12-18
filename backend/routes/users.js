const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const users = await db.query("SELECT * FROM users");
  res.json(users.rows);
});

router.post("/", async (req, res) => {
  const { name, phone } = req.body;
  const result = await db.query("INSERT INTO users(name, phone) VALUES($1,$2) RETURNING *", [name, phone]);
  res.json(result.rows[0]);
});

module.exports = router;