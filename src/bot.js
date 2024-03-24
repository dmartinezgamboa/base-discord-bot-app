const { Client, GatewayIntentBits } = require("discord.js");

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
        this.login(this.TOKEN);
    }
}

module.exports = { Bot };
