import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OpenTrades() {
  const [trades, setTrades] = useState([]);

  const fetchTrades = async () => {
    try {
      const res = await axios.get("/api/trades");
      setTrades(res.data);
    } catch {
      toast.error("Failed to fetch trades");
    }
  };

  useEffect(() => { fetchTrades(); }, []);

  return (
    <div>
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-2">Open Trades</h2>
      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th>Symbol</th><th>Action</th><th>Entry</th><th>SL</th><th>TP</th>
            <th>Status</th><th>PnL</th><th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.symbol}</td>
              <td>{trade.action}</td>
              <td>{trade.entry}</td>
              <td>{trade.stop_loss}</td>
              <td>{trade.take_profit}</td>
              <td>{trade.status}</td>
              <td>{trade.realized_pnl}</td>
              <td>{trade.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}