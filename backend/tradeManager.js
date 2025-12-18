const CTrader = require("./ctrader");
const db = require("./db");
let ctrader;

async function initCTrader(config) {
  ctrader = new CTrader(config);
  await ctrader.login();
}

async function executeSignal(userId, signal, io) {
  const { symbol, action, entry, stop_loss, take_profit } = signal;
  const marketPrice = await ctrader.getMarketPrice(symbol);
  const volume = 1;
  let status = "pending";
  let reason = "";

  if ((action.toLowerCase() === "buy" && marketPrice < entry) ||
      (action.toLowerCase() === "sell" && marketPrice > entry)) {
    status = "skipped";
    reason = `Market price (${marketPrice}) not reached entry (${entry})`;
  } else if ((action.toLowerCase() === "buy" && marketPrice > entry && marketPrice >= take_profit) ||
             (action.toLowerCase() === "sell" && marketPrice < entry && marketPrice <= take_profit)) {
    status = "skipped";
    reason = `Target already reached: market price (${marketPrice}), TP (${take_profit})`;
  } else {
    try {
      const orderResult = await ctrader.placeOrder({ symbol, action, volume, stopLoss: stop_loss, takeProfit: take_profit });
      status = "executed";
      reason = "Trade successfully executed on cTrader";
    } catch (err) {
      status = "failed";
      reason = `Execution failed: ${err.message}`;
    }
  }

  const res = await db.query(
    `INSERT INTO trades(user_id, symbol, action, entry, stop_loss, take_profit, status, reason)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [userId, symbol, action, entry, stop_loss, take_profit, status, reason]
  );

  if(io) io.emit("trade-update", { message: `Trade ${status}: ${symbol} ${action}`, trade: res.rows[0] });
  return res.rows[0];
}

module.exports = { initCTrader, executeSignal };