const { BaseInteraction, InteractionType } = require("discord.js");
const { ApplicationCommandNotImplemented } = require("../../utils/errors");
const { interactionCreateDebug: debug } = require('../../utils/debug')
const { handleApplicationCommand } = require("./handleApplicationCommand");

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

const interactionEvent = {
    name: "interactionCreate",
    execute: execute,
};

module.exports = { interactionEvent };
