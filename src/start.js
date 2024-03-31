const { Bot } = require("./bot.js");
const { CLIENT_CONFIGURATION } = require("./config.js");
const { setDebugger, log } = require("./utils/debug.js");

const start = async () => {
    const client = new Bot(CLIENT_CONFIGURATION);

    log.extend("inside")
    log(`Starting ${Bot.name}`, "start");
    client.run();
};

setDebugger();
start();
