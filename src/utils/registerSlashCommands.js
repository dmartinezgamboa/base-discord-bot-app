const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { debug } = require('./debugger')

/**
 * Register commands globally unless a guild_id is provided.
 *
 * Usage:
 *  npm run register [--guild_id=<guild_id>] [--clear]
 *
 * Options:
 *  --guild_id=<guild_id>   register commands for guild
 *  --clear                clear all commands from registered list
 *
 * Note: Global commands and guild commands are separate lists.
 *  Registering a command globally and for a guild will result in duplicated commands in the server.
 *  Removing a command globally does not remove it from guild lists and vice versa.
 *
 * Only necessary to run when updating commands. There is a daily limit on registering new commands.
 * https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration
 */
const registerSlashCommands = async (params) => {
    debug('utils:registerSlashCommands').log(`Registering Commands with params: #{params}`)

    const { commands, clear, clientID, guildID, token } = params;

    const rest = new REST({ version: "9" }).setToken(token);
    const commandsBody = commands.map((command) => command.data.toJSON());
    const body = clear ? [] : commandsBody;

    try {
        if (guildID) {
            console.log(
                `${clear ? "Clearing" : "Registering"} application (/) commands for Guild ID: ${guildID} ...`
            );
            await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
                body: body,
            });
        } else {
            await rest.put(Routes.applicationCommands(clientID), {
                body: body,
            });
            console.log(
                `${clear ? "Clearing" : "Registering"} application (/) commands globally ...`
            );
        }
        console.log(
            `Successfully ${
                clear ? "cleared" : "registered"
            } application (/) commands!`
        );
    } catch (error) {
        debug('utils:registerSlashCommands').error(error)
    }
};

module.exports = { registerSlashCommands };
