const { Client, GatewayIntentBits } = require("discord.js");
const { setEvents } = require("./utils/setEvents")

class Bot extends Client {
    constructor(token) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
            ],
        });
        this.TOKEN = token;
    }

    run() {
        this.#registerEvents(this);
        this.login(this.TOKEN);
    }

    #registerEvents(client) {
        setEvents(client);
    }
}

module.exports = { Bot };
