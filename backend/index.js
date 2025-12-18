import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import { startTelegramListener } from "./telegram.js";   // Telegram listener
import tradeRoutes from "./routes/trades.js";             // API routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

/* ---------- PATH FIX ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- HEALTH CHECK ---------- */
app.get("/health", (_, res) => res.send("OK"));

/* ---------- API ROUTES ---------- */
app.use("/api/trades", tradeRoutes);

/* ---------- START TELEGRAM LISTENER ---------- */
(async () => {
  try {
    await startTelegramListener();
    console.log("✅ Telegram listener started");
  } catch (err) {
    console.error("⚠ Telegram listener failed:", err);
    // Do NOT exit process — server should still start
  }
})();

/* ---------- SERVE FRONTEND ---------- */
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (_, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Full-stack app running on port ${PORT}`);
});
