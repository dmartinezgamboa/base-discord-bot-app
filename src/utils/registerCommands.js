require("dotenv").config();

const commands = require("../commands");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const {
    TOKEN,
    CLIENT_ID,
    npm_config_guild_id: GUILD_ID,
    npm_config_remove: REMOVE_COMMANDS,
} = process.env;

const rest = new REST({ version: "9" }).setToken(TOKEN);

/**
 * Register commands globally unless a guild_id is provided.
 *
 * Usage:
 *  npm run register [--guild_id=<guild_id>] [--remove]
 *
 * Options:
 *  --guild_id=<guild_id>   register commands for guild
 *  --remove                remove all commands from registered list
 *
 * Note: Global commands and guild commands are separate lists.
 *  Registering a command globally and for a guild will result in duplicated commands in the server.
 *  Removing a command globally does not remove it from guild lists and vice versa.
 *
 * Only necessary to run when updating commands. There is a daily limit on registering new commands.
 * https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration
 */
async function registerCommands() {
    const commandsBody = [];

    commands.forEach((command) => {
        commandsBody.push(command.data.toJSON());
    });

    const VERB = REMOVE_COMMANDS ? "Removing" : "Registering";
    const body = REMOVE_COMMANDS ? [] : commandsBody;

    try {
        if (GUILD_ID) {
            console.log(
                `${VERB} application (/) commands for Guild ID: ${GUILD_ID} ...`
            );
            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                {
                    body: body,
                }
            );
        } else {
            await rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: body,
            });
            console.log(`${VERB} application (/) commands globally ...`);
        }
        console.log(
            `Successfully ${
                REMOVE_COMMANDS ? "removed" : "registered"
            } application (/) commands!`
        );
    } catch (error) {
        console.error(error);
    }
}

registerCommands();
