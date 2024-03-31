const { Bot } = require("./bot.js");
const { CLIENT_CONFIGURATION } = require("./config.js");
const { configureDebugger, debug } = require("./utils/debug.js");

const start = async () => {
    const client = new Bot(CLIENT_CONFIGURATION);
    
    configureDebugger();

    debug('start').log(`Starting ${Bot.name}`)
    client.run();
};

start();
