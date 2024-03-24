const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { setCommands } = require("./utils/setCommands");
const { setEvents } = require("./utils/setEvents");

class Bot extends Client {
    constructor(token) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
            ],
        });
        this.TOKEN = token;
        this.commands = new Collection();
    }

    run() {
        this.#registerCommands(this);
        this.#registerEvents(this);
        this.login(this.TOKEN);
    }

    #registerCommands(client) {
        setCommands(client);
    }

    #registerEvents(client) {
        setEvents(client);
    }
}

module.exports = { Bot };
