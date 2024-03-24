const { Client } = require("discord.js");
const commands = require("../commands");

/**
 * Retrieves all commands and attaches to client on start.
 * Add new commands in src/commands.
 *
 * @param {Client} client
 *
 * https://discordjs.guide/creating-your-bot/command-handling.html
 */
function setCommands(client) {
    commands.forEach((command) => {
        client.commands.set(command.data.name, command);
        console.log(`Command: '${command.data.name}' set on client`);
    });
}

module.exports = { setCommands };