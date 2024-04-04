const { Client } = require("discord.js");
const { setCommandsDebug: debug } = require('./debug')
const { InvalidSlashCommand } = require('./errors')

/**
 * Retrieves all commands and attaches to client on start.
 * Add new commands in src/commands.
 *
 * https://discordjs.guide/creating-your-bot/command-handling.html
 * 
 * @param {Client} client
 * @param {Array} commands
 */
const setCommands = (client, commands) => {
    debug.log('#call')

    commands.forEach((command) => {
        if (!('data' in command) || !('execute' in command)) {
            throw new InvalidSlashCommand(`command: ${command} is missing a 'data' [SlashCommandBuilder] or 'execute' [Function] property.`);
        };
        const commandName = command.data.name
        
        debug.log(`setting command: '${commandName}'`)
        client.commands.set(commandName, command);
    });
}

module.exports = { 
    setCommands: setCommands,
}
