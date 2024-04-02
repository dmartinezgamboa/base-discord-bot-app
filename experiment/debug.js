/** 
 * returns a new Debugger class instance with more options 
 * usage: 
 *  debug.log(message)
 *  debug.error(error, message)
 *  // extending:
 *  newDebug = debug.extend(newNamespace)
 *  newDebug.log(newMessage)
 */
class Debugger {
    #debug;

    // eslint-disable-next-line jsdoc/valid-types
    /** @param {require('debug')(namespace)} debug namespaced instance of debug module */
    constructor(debug) {
        this.#debug = debug
    }

    log(message) {
        this.#debug(message)
    }

    error(error) {
        // formatted different
        this.#debug('error', error)
    }

    /** Extending this way does not work */
    extend(namespace) {
        const extendedDebug = this.#debug.extend(namespace)
        return new Debugger(extendedDebug)
    }
}

module.exports = { Debugger }