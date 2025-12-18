require("dotenv").config();

module.exports = {
  telegram: {
    apiId: parseInt(process.env.API_ID),
    apiHash: process.env.API_HASH,
    sessionString: process.env.SESSION_STRING || "",
    inviteLink: process.env.INVITE_LINK
  },
  openaiKey: process.env.OPENAI_API_KEY,
  ctrader: {
    clientId: process.env.CTRADER_CLIENT_ID,
    clientSecret: process.env.CTRADER_CLIENT_SECRET,
    username: process.env.CTRADER_USERNAME,
    password: process.env.CTRADER_PASSWORD,
    demo: process.env.CTRADER_DEMO === "true"
  },
  databaseUrl: process.env.DATABASE_URL
};