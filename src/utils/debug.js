const { npm_config_debug: DEBUG } = process.env

const debug = (namespace) => {
    return new Debugger(namespace)
}

const configureDebugger = () => {
    process.env.DEBUG = (DEBUG === "true") ? "*" : DEBUG
};

class Debugger {
    #debugger;

    constructor(namespace) {
        this.#debugger = require('debug')(namespace) 
    }
    
    #extend(namespace) {
        this.#debugger = this.#debugger.extend(namespace)
    }

    log(message) {
        this.#debugger(message)
    }

    error(message) {
        this.#extend("ERROR")
        this.#debugger(message)
    }
}

module.exports = { debug, configureDebugger }