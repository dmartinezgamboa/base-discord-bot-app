const { BaseInteraction, InteractionType } = require("discord.js");
const { ApplicationCommandNotImplemented } = require("../../utils/errors");
const { log } = require('../../utils/debugger')
const { handleApplicationCommand } = require("./handleApplicationCommand");

/**
 * Executes on interaction. First check if input is slash command.
 *
 * @param {BaseInteraction} interaction
 *
 * https://old.discordjs.dev/#/docs/discord.js/main/class/BaseInteraction
 */
const execute = (interaction) => {
    switch (interaction.type) {
        case InteractionType.ApplicationCommand:
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
    execute: log(__filename, execute),
};

module.exports = { interactionEvent };
