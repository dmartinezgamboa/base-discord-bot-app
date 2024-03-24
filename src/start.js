require("dotenv").config();

const { Bot } = require("./bot.js");
const commands = require("./commands");
const events = require("./events");

const { TOKEN } = process.env;

const start = async () => {
    const clientConfiguration = {
        token: TOKEN,
        commands: commands,
        events: events,
    };
    const client = new Bot(clientConfiguration);
    client.run();
};

start();
