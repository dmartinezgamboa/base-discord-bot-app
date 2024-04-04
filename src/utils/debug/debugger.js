class Debugger {
    #debug;
    
    constructor(debug) {
        this.#debug = debug
    }

    /**
     * New extended instances get their own scope. This does not mutate 'this'.
     * 
     * @returns {Debugger} new instance of Debugger
     */
    extend(namespace) {
        return new Debugger(this.#debug.extend(namespace))
    }

    error(error) {
        const errorDebug = this.extend('ERROR')
        errorDebug.log(error)
    }
    
    log(message) {
        this.#debug(message)
    }
}

module.exports = {
    Debugger
}