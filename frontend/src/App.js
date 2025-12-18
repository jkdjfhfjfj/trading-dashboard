import React from "react";
import OpenTrades from "./components/OpenTrades";
import TelegramSettings from "./components/TelegramSettings";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Trading Dashboard</h1>
      <TelegramSettings />
      <OpenTrades />
    </div>
  );
}

export default App;