const { Bot } = require("./bot.js");
const { CLIENT_CONFIGURATION } = require("./config.js");

const start = async () => {
    const client = new Bot(CLIENT_CONFIGURATION);
    client.run();
};

start();
