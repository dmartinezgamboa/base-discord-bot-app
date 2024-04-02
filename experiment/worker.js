const { workerDebug: debug } = require('./debuggers')

const _debug = require('debug')('test:vanilla')

const work = (message) => {
    debug.log(message)
    _debug(message)

    setTimeout(work, 1000, 'inside work setTimeout (1)')

    /** 
     * The following does not work correctly for ms 
     * This is using Debugger.extend
     */
    const extendedDebug = debug.extend('test:Debugger:extended')
    setTimeout((message) => {extendedDebug.log(message)}, 2000, 'inside work setTimeout (2)')

    /** 
     * The following does not work correctly for ms 
     * This is using the library?
     */
    const extended_Debug = _debug.extend('extended')
    extended_Debug("called from secondDebug")
    setTimeout((message) => {extended_Debug(message)}, 3000, 'inside vanilla debug work setTimeout (3)')

    setTimeout(() => {throw new Error('eureka!')}, 7000)
}

module.exports = { work }