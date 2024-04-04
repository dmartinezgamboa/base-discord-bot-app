const { Client } = require("discord.js");
const { setCommandsDebug: debug } = require('./debug')

/**
 * Retrieves all commands and attaches to client on start.
 * Add new commands in src/commands.
 *
 * @param {Client} client
 * @param {Array} commands
 * 
 * https://discordjs.guide/creating-your-bot/command-handling.html
 */
function setCommands(client, commands) {
    debug.log('#call')
    commands.forEach((command) => {
        debug.log(`setting command: '${command.data.name}'`)
        client.commands.set(command.data.name, command);
    });
}

module.exports = { 
    setCommands: setCommands,
}
