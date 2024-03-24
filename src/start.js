require("dotenv").config();

const { Bot } = require("./bot.js");

const { TOKEN } = process.env;

const start = async () => {
    const client = new Bot(TOKEN);
    client.run();
};

start();
