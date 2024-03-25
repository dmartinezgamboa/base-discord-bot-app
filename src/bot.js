const { Client, Collection } = require("discord.js");
const { setCommands } = require("./utils/setCommands");
const { setEvents } = require("./utils/setEvents");

class Bot extends Client {
    #TOKEN;
    #commands;
    #events;

    constructor(clientConfiguration) {
        const { token, commands, events, intents } = clientConfiguration;

        super({ intents });

        this.commands = new Collection();

        this.#TOKEN = token;
        this.#commands = commands;
        this.#events = events;
    }

    run() {
        this.#registerClientCommands();
        this.#registerClientEvents();
        this.#login();
    }

    #login() {
        this.login(this.#TOKEN);
    }

    #registerClientCommands() {
        setCommands(this, this.#commands);
    }

    #registerClientEvents() {
        setEvents(this, this.#events);
    }
}

module.exports = { Bot };
