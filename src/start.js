const { Bot } = require("./bot.js");
const { CLIENT_CONFIGURATION } = require("./config.js");
const { configureDebugger, debug } = require("./utils/debugger.js");

const start = async () => {
    debug(__filename, start.name).log("Starting Application")
    
    const client = new Bot(CLIENT_CONFIGURATION);
    
    client.run();
};

configureDebugger();
start();
