require("dotenv").config();

const { GatewayIntentBits } = require("discord.js");
const commands = require("./commands");
const events = require("./events");

const {
    npm_config_clear: CLEAR_REGISTERED_SLASH_COMMANDS,
    npm_config_guild_id: GUILD_ID,
    npm_config_register: REGISTER_SLASH_COMMANDS,
    CLIENT_ID,
    TOKEN,
} = process.env;

const intents = [GatewayIntentBits.Guilds];

const CLIENT_CONFIGURATION = {
    clear: CLEAR_REGISTERED_SLASH_COMMANDS,
    clientID: CLIENT_ID,
    guildID: GUILD_ID,
    register: REGISTER_SLASH_COMMANDS,
    token: TOKEN,
    commands: commands,
    events: events,
    intents: intents,
};

module.exports = { CLIENT_CONFIGURATION };
