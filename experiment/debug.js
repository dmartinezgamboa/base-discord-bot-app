class Debugger {
    #debug;

    constructor(debug) {
        /** #debug: require('debug')('{namespace}') */
        this.#debug = debug
    }

    log(message) {
        this.#debug(message)
    }

    error(error) {
        // formatted different
        this.#debug('error', error)
    }

    extend(namespace) {
        const extendedDebug = this.#debug.extend(namespace)
        return new Debugger(extendedDebug)
    }
}

module.exports = { Debugger }