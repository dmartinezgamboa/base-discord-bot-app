const { Client } = require("discord.js");
const { log } = require('./debugger')

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
    commands.forEach((command) => {
        client.commands.set(command.data.name, command);
    });
}

module.exports = { 
    setCommands: log(__filename, setCommands),
}
