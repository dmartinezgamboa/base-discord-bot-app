const { Bot } = require("./bot.js");
const { CLIENT_CONFIGURATION } = require("./config.js");
const { configureDebugger, Debug, log } = require("./utils/debugger.js");

const start = async () => {
    configureDebugger();
    const debug = Debug(__filename, start.name)
    debug().log('starting application')
    
    const client = new Bot(CLIENT_CONFIGURATION);
    client.run()
};

start();
