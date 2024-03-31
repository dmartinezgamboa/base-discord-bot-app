const { Bot } = require("./bot.js");
const { CLIENT_CONFIGURATION } = require("./config.js");
const { configureDebugger, debug } = require("./utils/debugger.js");

const start = async () => {
    debug('start').log(`Starting ${Bot.name}`)
    const client = new Bot(CLIENT_CONFIGURATION);
    
    
    client.run();
};

configureDebugger();
start();
