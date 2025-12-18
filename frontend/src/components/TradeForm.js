import React, { useState } from "react";
import axios from "../utils/api";
import { toast, ToastContainer } from "react-toastify";

export default function TradeForm() {
  const [trade, setTrade] = useState({ symbol: "", action: "buy", entry: "", stop_loss: "", take_profit: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/trades", trade);
      toast.success("Trade added successfully");
    } catch {
      toast.error("Failed to add trade");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
        <input placeholder="Symbol" value={trade.symbol} onChange={e => setTrade({ ...trade, symbol: e.target.value })} />
        <select value={trade.action} onChange={e => setTrade({ ...trade, action: e.target.value })}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input placeholder="Entry" type="number" value={trade.entry} onChange={e => setTrade({ ...trade, entry: e.target.value })} />
        <input placeholder="SL" type="number" value={trade.stop_loss} onChange={e => setTrade({ ...trade, stop_loss: e.target.value })} />
        <input placeholder="TP" type="number" value={trade.take_profit} onChange={e => setTrade({ ...trade, take_profit: e.target.value })} />
        <button type="submit">Add Trade</button>
      </form>
    </>
  );
}