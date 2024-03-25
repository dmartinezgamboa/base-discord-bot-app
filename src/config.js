require("dotenv").config();

const { GatewayIntentBits } = require("discord.js");
const commands = require("./commands");
const events = require("./events");

const { TOKEN } = process.env;

const CLIENT_CONFIGURATION = {
    token: TOKEN,
    commands: commands,
    events: events,
    intents: [GatewayIntentBits.Guilds],
};

module.exports = { CLIENT_CONFIGURATION };
