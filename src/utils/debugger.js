const { npm_config_debug: DEBUG } = process.env

const configureDebugger = () => {
    process.env.DEBUG = (DEBUG === "true") ? "*" : DEBUG
};

const debug = (namespace) => {
    return new Debugger(namespace)
}

class Debugger {
    #debugger;

    constructor(namespace) {
        /* Importing 'debug' outside of the class body does not work */
        this.#debugger = require('debug')(namespace) 
    }
    
    #extend(namespace) {
        this.#debugger = this.#debugger.extend(namespace)
    }

    log(...params) {
        this.#debugger(...params)
    }

    error(...params) {
        this.#debugger(...params)
    }
}

module.exports = { configureDebugger, debug }