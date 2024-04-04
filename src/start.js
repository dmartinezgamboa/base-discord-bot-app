const { Bot } = require("./bot.js");
const { CLIENT_CONFIGURATION } = require("./config.js");

const { startDebug: debug } = require('./utils/debug')

const start = async () => {
    debug.log('starting application')
    const client = new Bot(CLIENT_CONFIGURATION);
    client.run()
};

start();
