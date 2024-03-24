const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { setCommands } = require("./utils/setCommands");
const { setEvents } = require("./utils/setEvents");

class Bot extends Client {
    constructor(clientConfiguration) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
            ],
        });

        this.commands = new Collection();

        const { token, commands, events } = clientConfiguration;
        this._TOKEN = token;
        this._commands = commands;
        this._events = events;
    }

    run() {
        this.#registerClientCommands();
        this.#registerClientEvents();
        this.#login();
    }

    #login() {
        this.login(this._TOKEN);
    }

    #registerClientCommands() {
        setCommands(this, this._commands);
    }

    #registerClientEvents() {
        setEvents(this, this._events);
    }
}

module.exports = { Bot };
