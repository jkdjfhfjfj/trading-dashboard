import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import { startTelegramListener } from "./telegram.js";  // Correct path
import tradeRoutes from "./routes/trades.js";           // Correct path

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

/* ---------- START SERVICES ---------- */
(async () => {
  try {
    await startTelegramListener();   // Start Telegram listener
    console.log("✅ Services initialized");
  } catch (err) {
    console.error("❌ Startup failure:", err);
    process.exit(1);
  }
})();

/* ---------- SERVE FRONTEND ---------- */
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (_, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () =>
  console.log(`🚀 Full-stack app running on port ${PORT}`)
);    console.error("❌ Startup failure:", err);
    process.exit(1);
  }
})();

/* ---------- SERVE FRONTEND ---------- */
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (_, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () =>
  console.log(`🚀 Full-stack app running on ${PORT}`)
);
