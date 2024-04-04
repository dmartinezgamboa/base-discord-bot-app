const { BaseInteraction, InteractionType } = require("discord.js");
const { ApplicationCommandNotImplemented, NoMatchingClientCommandNameError } = require("../utils/errors");
const { interactionCreateDebug: debug } = require('../utils/debug')

/**
 * Executes on interaction. First check if input is slash command.
 *
 * @param {BaseInteraction} interaction
 *
 * https://old.discordjs.dev/#/docs/discord.js/main/class/BaseInteraction
 */
const execute = (interaction) => {
    debug.log('#execute')
    switch (interaction.type) {
        case InteractionType.ApplicationCommand:
            debug.log("interaction type: 'ApplicationCommand'")
            handleApplicationCommand(interaction);
            break;
        default:
            throw new ApplicationCommandNotImplemented(
                "Unhandled ApplicationCommandType."
            );
    }
};

const handleApplicationCommand = async (interaction) => {
    debug.log('#call')
    if (interaction.isChatInputCommand()) {
        debug.log("application command type: 'ChatInputCommand'")

        const { commandName } = interaction;
        const command = interaction.client.commands.get(commandName);

        try {
            if (!command) {
                throw new NoMatchingClientCommandNameError(`No command matching ${interaction.commandName} was found.`);
            }
            
            await command.execute(interaction);
        } catch (error) {
            debug.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};

const interactionEvent = {
    name: "interactionCreate",
    execute: execute,
};

module.exports = { interactionEvent };
