const axios = require("axios");

class CTrader {
  constructor({ clientId, clientSecret, username, password, demo = true }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.username = username;
    this.password = password;
    this.demo = demo;
    this.token = null;
    this.accountId = null;
    this.baseUrl = demo ? "https://demo.ctraderapi.com" : "https://api.ctraderapi.com";
  }

  async login() {
    const resp = await axios.post(`${this.baseUrl}/oauth/token`, {
      grant_type: "password",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      username: this.username,
      password: this.password
    });
    this.token = resp.data.access_token;

    const accounts = await axios.get(`${this.baseUrl}/trading/accounts`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    this.accountId = accounts.data[0].id;
  }

  async getMarketPrice(symbol) {
    const resp = await axios.get(`${this.baseUrl}/trading/symbols/${symbol}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return resp.data.Bid;
  }

  async placeOrder({ symbol, action, volume, stopLoss, takeProfit }) {
    const side = action.toLowerCase() === "buy" ? "Buy" : "Sell";
    const order = { AccountId: this.accountId, Symbol: symbol, Volume: volume, TradeType: side, StopLoss: stopLoss, TakeProfit: takeProfit };
    const resp = await axios.post(`${this.baseUrl}/trading/orders/market`, order, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return resp.data;
  }
}

module.exports = CTrader;