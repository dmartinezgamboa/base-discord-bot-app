const { Debugger } = require('./debug')

const workerDebug = require('debug')('experiment:worker')

module.exports = { workerDebug: new Debugger(workerDebug) }