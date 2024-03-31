const path = require('path')
const { DebuggerArgumentError } = require('./errors')

const { 
    npm_config_debug: DEBUG,
    npm_config_params: PARAMS
 } = process.env
 
/**
 * Wrapper for debug logging. Prints to `stdout` on `func` invocation and on errors.
 * Binding the original function to `loggedFunc` also helps associating functions back to their export locations.
 * `async` is necessary to support asynchronous callbacks.
 * 
 * @param {string} fileName should be `__filename` argument for the namespace to generate properly
 * @param {Function} func the function we want to decorate
 * @param {...string} messages optional: any additional logging desired during `func` invocation
 * 
 * @returns {Function} wrapped function
 */
const log = (fileName, func, ...messages) => {
    const loggedFunc = async (...params) => {
        const debug = Debug(fileName, func.name)
        try {
            debug().log(...messages)
            if (PARAMS === "true") { debug().params(...params) }
            
            return await func(...params)
        } catch(error) {
            debug().error(error)
        }
    }
    return loggedFunc.bind(func)
}

/**
 * Usage:
 *  ```
 *  // additionalNamespaces is optional
 *  const debug = Debug(__filename, someFunction.name, ...additionalNamespaces)
 *  // moreNamespaces and messages are optional
 *  debug(...moreNamespaces).log(...messages)
 *  ```
 * 
 * `debug` also has `error` and `params` methods for special logging
 * See `Debugger` class for more information
 * 
 * @param  {...string} namespaces 
 * @returns {Debugger.ready} invoking `ready` returns an instance of `Debugger`
 */
const Debug = (...namespaces) => {
    const _debugger = new Debugger(...namespaces)
    return _debugger.ready.bind(_debugger)
}

const configureDebugger = () => {
    process.env.DEBUG = (DEBUG === "true") ? "*" : DEBUG
};

/**
 * @function ready returns current instance of Debugger 
 * @function message logs any message arguments in namespace
 * @function error logs any arguments with 'error' namespace
 * @function params logs any arguments with 'params' namespace
 */
class Debugger {
    #debugger;
    
    /** @param {...string} namespaces */
    constructor(...namespaces) {
        const namespace = Debugger.#generateNamespace(...namespaces)

        /** Importing 'debug' outside of the class body does not work */
        this.#debugger = require('debug')(namespace)
    }

    static #generateNamespace(filePath, ...namespaces) {
        try {
            if (!filePath) {
                throw new DebuggerArgumentError("debug() requires a filePath as first argument (__dirname)")
            }
            const { name: fileName } = path.parse(filePath)
            const directoryPath = path.dirname(filePath)
            const formattedDirectoryPath = path.relative('./', directoryPath)

            var namespace = `${formattedDirectoryPath}:${fileName}`.replaceAll('/', ':')

            namespaces.forEach((name) => {
                namespace += `:${name}`
            })
    
            return namespace

            } catch(error) {
                const log = require('debug')("utils:debugger:ERROR")
                log(error)

            return ""
        }
    }
    
    #extend(...namespaces) {
        namespaces.forEach((namespace) => {
            this.#debugger = this.#debugger.extend(namespace)
        })
    }

    /** 
     * @param {...string} namespaces 
     * @returns {Debugger} the current instance of Debugger with namespace
     */
    ready(...namespaces) {
        if (namespaces) { this.#extend(...namespaces) }
        return this
    }
    
    log(...messages) {
        if (messages.length) {
            messages.forEach((message) => { this.#debugger(message) })
        } else {
            this.#debugger('called')
        }
    }
    
    error(message) {
        try {
            if (!message) {
                throw new DebuggerArgumentError("Message or Error argument required")
            }
            this.#extend("ERROR")
            this.#debugger(message)
        } catch(error) {
            this.#extend('utils:debugger:error:ERROR')
            this.#debugger(error)
        }
    }

    params(...params) {
        this.#extend('params')
        this.#debugger({ ...params })
    }
}

module.exports = { configureDebugger, Debug, log }