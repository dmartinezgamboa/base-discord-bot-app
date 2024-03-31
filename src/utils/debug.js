const { npm_config_debug: DEBUG } = process.env

const log = (message, name) => {
    const debug = require('debug')(name)
    debug(message)
    return debug
};

const setDebugger = () => {
    process.env.DEBUG = (DEBUG === "true") ? "*" : DEBUG
};

module.exports = { log, setDebugger }