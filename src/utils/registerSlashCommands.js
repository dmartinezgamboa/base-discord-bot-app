const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { registerSlashCommandsDebug: debug } = require('./debug')

const registerSlashCommands = async (params) => {
    debug.log('#call')
    const { commands, clear, clientID, guildID, token } = params;

    const rest = new REST({ version: "9" }).setToken(token);
    const commandsBody = commands.map((command) => command.data.toJSON());
    const body = clear ? [] : commandsBody;

    try {
        if (guildID) {
            debug.log("'guildID' argument is present")
            console.log(
                `${clear ? "Clearing" : "Registering"} application (/) commands for Guild ID: ${guildID} ...`
            );
            await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
                body: body,
            });
        } else {
            debug.log("no 'guildID' argument is present")
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
        console.error(error)
    }
};

module.exports = { registerSlashCommands: registerSlashCommands };
