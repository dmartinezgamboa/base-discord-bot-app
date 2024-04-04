const { Bot } = require("./bot.js");
const { registerSlashCommands } = require('./utils/registerSlashCommands.js')

const { CLIENT_CONFIGURATION } = require("./config.js");

const { startDebug: debug } = require('./utils/debug')

const start = async () => {
    debug.log('starting application')

    const { register_slash_commands, register_only } = CLIENT_CONFIGURATION

    if (register_slash_commands || register_only) {
        debug.log('register_slash_commands is true')
        registerSlashCommands(CLIENT_CONFIGURATION)
        if (register_only) {
            debug.log('register_only is true, exiting application')
            return
        }
    }

    const client = new Bot(CLIENT_CONFIGURATION);
    client.run()
};

start();
