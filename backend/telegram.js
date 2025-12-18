import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input"; // npm install input
import dotenv from "dotenv";

dotenv.config();

const apiId = process.env.TELEGRAM_API_ID;       // e.g., 34108253
const apiHash = process.env.TELEGRAM_API_HASH;   // your hash
const stringSession = new StringSession("");      // Empty for now; can save session later

/**
 * Start Telegram listener
 */
export async function startTelegramListener() {
  try {
    console.log("⚡ Starting Telegram client...");

    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });

    await client.start({
      phoneNumber: async () => await input.text("Enter your phone number: "),
      password: async () => await input.text("Enter 2FA password: "),
      phoneCode: async () => await input.text("Enter the code you received: "),
      onError: (err) => console.log("Telegram login error:", err),
    });

    console.log("✅ Telegram client started");

    // Replace with your public channel invite link
    const channelLink = process.env.TELEGRAM_CHANNEL_LINK; 
    const channel = await client.getEntity(channelLink);

    console.log(`Listening to messages from: ${channel.title}`);

    // Listen for new messages
    client.addEventHandler((event) => {
      const message = event.message.message;
      console.log("📨 New message:", message);

      // TODO: Parse message for forex signals, send to trade engine
    }, new NewMessage({ chats: [channel] }));

  } catch (err) {
    console.error("❌ Failed to start Telegram listener:", err);
  }
}
