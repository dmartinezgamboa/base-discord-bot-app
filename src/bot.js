const { Client, Collection } = require("discord.js");
const { Debug } = require('./utils/debugger')
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
        try {
            this.#debug(this.run.name).log()
    
            if (this.#register) {
                this.#registerSlashCommands();
            }
    
            this.#registerClientCommands();
            this.#registerClientEvents();    
            this.#login();
        } catch(error) {
            this.#debug(this.run.name).error(error)
        }
    }

    get #register() {
        /** Must be logged this way or triggers a stack overflow */
        this.#debug('#register').log('get')

        return this.#OPTIONS.register;
    }

    #debug(...namespace) {
        const debug = Debug(__filename, Bot.name)
        return debug(...namespace)
    }

    #login() {
        this.#debug(this.#login.name).log()
        this.login(this.#CLIENT_AUTH.token);
    }

    #registerClientCommands() {
        this.#debug(this.#registerClientCommands.name).log()

        const commands = this.#DATA.commands;
        setCommands(this, commands);
    }

    #registerClientEvents() {
        this.#debug(this.#registerClientEvents.name).log()

        const events = this.#DATA.events;
        setEvents(this, events);
    }

    #registerSlashCommands() {
        this.#debug(this.#registerSlashCommands.name).log()

        const params = {
            ...this.#CLIENT_AUTH,
            ...this.#OPTIONS,
            ...this.#DATA,
        };
        registerSlashCommands(params);
    }
}

module.exports = { Bot };
