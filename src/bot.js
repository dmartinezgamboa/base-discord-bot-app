const { Client, Collection } = require("discord.js");
const { debug } = require('./utils/debugger')
const { registerSlashCommands } = require("./utils/registerSlashCommands");
const { setCommands } = require("./utils/setCommands");
const { setEvents } = require("./utils/setEvents");

class Bot extends Client {
    #CLIENT_AUTH;
    #OPTIONS;
    #DATA;

    constructor(config) {
        debug(__filename, Bot.name).log('Initializing Bot', config)
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
        debug(__filename, this.run.name).log("Running the Bot Client")

        if (this.#register) {
            this.#registerSlashCommands();
        }

        this.#registerClientCommands();
        this.#registerClientEvents();
        this.#login();
    }

    get #register() {
        debug(__filename, "#register").log('get')

        return this.#OPTIONS.register;
    }

    #login() {
        debug(__filename, this.#login.name).log()

        this.login(this.#CLIENT_AUTH.token);
    }

    #registerClientCommands() {
        debug(__filename, this.#registerClientCommands.name).log()

        const commands = this.#DATA.commands;
        setCommands(this, commands);
    }

    #registerClientEvents() {
        debug(__filename, this.#registerClientEvents.name).log()

        const events = this.#DATA.events;
        setEvents(this, events);
    }

    #registerSlashCommands() {
        debug(__filename, this.#registerSlashCommands.name).log()

        const params = {
            ...this.#CLIENT_AUTH,
            ...this.#OPTIONS,
            ...this.#DATA,
        };
        registerSlashCommands(params);
    }
}

module.exports = { Bot };
