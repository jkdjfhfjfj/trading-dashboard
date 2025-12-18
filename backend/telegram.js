import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js"; // <-- explicit file import
import input from "input";
import dotenv from "dotenv";
import { NewMessage } from "telegram/events/index.js";

dotenv.config();

const apiId = parseInt(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;
const stringSession = new StringSession(""); // Empty session for now

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

    // Public channel invite link from .env
    const channelLink = process.env.TELEGRAM_CHANNEL_LINK;
    const channel = await client.getEntity(channelLink);

    console.log(`Listening to messages from: ${channel.title}`);

    client.addEventHandler(
      (event) => {
        const message = event.message.message;
        console.log("📨 New message:", message);

        // TODO: parse message for forex signals and call trade engine
      },
      new NewMessage({ chats: [channel] })
    );
  } catch (err) {
    console.error("❌ Failed to start Telegram listener:", err);
  }
}
