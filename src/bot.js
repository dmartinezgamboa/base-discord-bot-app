const { Client, Collection } = require("discord.js");
const { registerSlashCommands } = require("./utils/registerSlashCommands");
const { setCommands } = require("./utils/setCommands");
const { setEvents } = require("./utils/setEvents");

class Bot extends Client {
    #CLIENT_AUTH;
    #OPTIONS;
    #DATA;

    constructor(config) {
        super({ intents: config.intents });

        this.commands = new Collection();

        this.#DATA = {
            commands: config.commands,
            events: config.events,
        };
        this.#OPTIONS = {
            clear: config.clear,
            guildID: config.guildID,
            register: config.register,
        };
        this.#CLIENT_AUTH = {
            clientID: config.clientID,
            token: config.token,
        };
    }

    run() {
        if (this.#register) {
            this.#registerSlashCommands();
        }

        this.#registerClientCommands();
        this.#registerClientEvents();
        this.#login();
    }

    get #register() {
        return this.#OPTIONS.register;
    }

    #login() {
        this.login(this.#CLIENT_AUTH.token);
    }

    #registerClientCommands() {
        const commands = this.#DATA.commands;
        setCommands(this, commands);
    }

    #registerClientEvents() {
        const events = this.#DATA.events;
        setEvents(this, events);
    }

    #registerSlashCommands() {
        const params = {
            ...this.#CLIENT_AUTH,
            ...this.#OPTIONS,
            ...this.#DATA,
        };
        registerSlashCommands(params);
    }
}

module.exports = { Bot };
