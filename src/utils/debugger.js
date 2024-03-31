const path = require('path')
const { DebuggerArgumentError } = require('./errors')

const { npm_config_debug: DEBUG } = process.env

class Debugger {
    #debugger;
    
    constructor(filePath, methodName) {
        const namespace = Debugger.#generateNamespace(filePath, methodName)

        /* Importing 'debug' outside of the class body does not work */
        this.#debugger = require('debug')(namespace)
    }

    static #generateNamespace(filePath, methodName) {
        try {
            if (!filePath || !methodName) {
                throw new DebuggerArgumentError("debug() requires a filePath (__dirname) and methodName")
            }
            const { name: fileName } = path.parse(filePath)
            const directoryPath = path.dirname(filePath)
            const formattedDirectoryPath = path.relative('./', directoryPath)
            const namespace = `${formattedDirectoryPath}:${fileName}:${methodName}`.replaceAll('/', ':')
    
            return namespace
        } catch(error) {
            const debugError = require('debug')("utils:debugger:ERROR")
            debugError(error)
            return ""
        }
    }
    
    #extend(namespace) {
        this.#debugger = this.#debugger.extend(namespace)
    }

    #parseParams(...params) {
        if (params.length) {
            this.#debugger({ ...params })
        }
    }
    
    log(message, ...params) {
            if (!message) return this.#debugger("call")
            this.#debugger(message)
            this.#parseParams(...params)
    }
    
    error(message, ...params) {
        try {
            if (!message) throw new DebuggerArgumentError("Message or Error argument required")
                this.#extend("ERROR")
                this.#debugger(message)
                this.#parseParams(...params)
        } catch(error) {
            this.#extend('utils:debugger:error:ERROR')
            this.#debugger(error)
        }
    }
}

const configureDebugger = () => {
    process.env.DEBUG = (DEBUG === "true") ? "*" : DEBUG
};

const debug = (...params) => {
    configureDebugger();
    return new Debugger(...params)
}

module.exports = { configureDebugger, debug }