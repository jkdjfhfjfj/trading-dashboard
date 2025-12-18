const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { initCTrader } = require("./tradeManager");
const tradeRoutes = require("./routes/trades");
const userRoutes = require("./routes/users");
const config = require("./config");
const { startTelegramListener } = require("./telegram");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/trades", tradeRoutes);
app.use("/api/users", userRoutes);

global.io = io;

async function startApp() {
  await initCTrader(config.ctrader);
  await startTelegramListener(1); // Replace 1 with actual userId
}

startApp().catch(console.error);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));