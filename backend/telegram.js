const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const { executeSignal } = require("./tradeManager");
const config = require("./config");
const OpenAI = require("openai");

let io;

const client = new TelegramClient(
  new StringSession(config.telegram.sessionString),
  config.telegram.apiId,
  config.telegram.apiHash,
  { connectionRetries: 5 }
);

const openai = new OpenAI({ apiKey: config.openaiKey });

async function startTelegramListener(userId) {
  io = global.io;
  
  await client.start({
    phoneNumber: async () => await input.text("Enter your phone number: "),
    password: async () => await input.text("Enter 2FA password: "),
    phoneCode: async () => await input.text("Enter the code you received: "),
    onError: (err) => console.log(err)
  });

  const channel = await client.getEntity(config.telegram.inviteLink);

  client.addEventHandler(async (event) => {
    try {
      const message = event.message.message;
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an expert forex signal parser." },
          { role: "user", content: `Extract signal from this text: "${message}" in JSON format with symbol, action, entry, stop_loss, take_profit` }
        ]
      });

      const signalJson = response.choices[0].message.content;
      const signal = JSON.parse(signalJson);
      await executeSignal(userId, signal, io);
    } catch (err) {
      console.error("Telegram listener error:", err.message);
    }
  }, new client.events.NewMessage({ chats: [channel] }));
}

module.exports = { startTelegramListener };