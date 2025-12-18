import React, { useState } from "react";
import axios from "../utils/api";
import { toast, ToastContainer } from "react-toastify";

export default function TelegramSettings() {
  const [apiId, setApiId] = useState("");
  const [apiHash, setApiHash] = useState("");
  
  const handleSave = async () => {
    try {
      await axios.post("/api/users", { apiId, apiHash });
      toast.success("Telegram settings saved");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  return (
    <div className="mb-4 bg-white p-4 rounded shadow">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-2">Telegram Settings</h2>
      <input 
        className="w-full mb-2" 
        placeholder="Telegram API ID" 
        value={apiId} 
        onChange={e => setApiId(e.target.value)} 
      />
      <input 
        className="w-full mb-2" 
        placeholder="Telegram API Hash" 
        value={apiHash} 
        onChange={e => setApiHash(e.target.value)} 
      />
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
}