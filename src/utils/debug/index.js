const debug = require('debug')
const { Debugger } = require('./debugger')

const debuggers = {
    botDebug: 'bot:Bot',
    readyEventDebug: 'events:ready',
    handleApplicationCommandDebug: 'events:interaction:handleApplicationCommand',
    interactionCreateDebug: 'events:interaction',
    pingCommandDebug: 'commands:ping',
    registerSlashCommandsDebug: 'utils:registerSlashCommands',
    setCommandsDebug: 'utils:setCommands',
    setEventsDebug: 'utils:setEvents',
    startDebug: 'start'
}

const exportDebuggers = () => {
    const exportedDebuggers = {}
    for (const [key, value] of Object.entries(debuggers)) {
        exportedDebuggers[key] = new Debugger(debug(value))
    }
    return exportedDebuggers
}

module.exports = exportDebuggers()