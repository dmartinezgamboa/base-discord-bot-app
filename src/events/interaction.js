const { BaseInteraction, InteractionType } = require("discord.js");
const { ApplicationCommandNotImplemented } = require("../utils/errors");
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

        await command.execute(interaction);
    }
};

const interactionEvent = {
    name: "interactionCreate",
    execute: execute,
};

module.exports = { interactionEvent };
