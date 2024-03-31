require("dotenv").config();

const commands = require("./commands");
const { log, configureDebugger } = require('./utils/debugger')
const { registerSlashCommands } = require("./utils/registerSlashCommands");

const {
    npm_config_clear: CLEAR_REGISTERED_SLASH_COMMANDS,
    npm_config_guild_id: GUILD_ID,
    CLIENT_ID,
    TOKEN,
} = process.env;

const params = {
    commands: commands,
    clear: CLEAR_REGISTERED_SLASH_COMMANDS,
    clientID: CLIENT_ID,
    guildID: GUILD_ID,
    token: TOKEN,
};

configureDebugger();
log(registerSlashCommands)(params);
