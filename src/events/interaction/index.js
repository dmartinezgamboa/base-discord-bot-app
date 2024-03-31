const { BaseInteraction, InteractionType } = require("discord.js");
const { ApplicationCommandNotImplemented } = require("../../utils/errors");
const { debug } = require('../../utils/debugger')
const { handleApplicationCommand } = require("./handleApplicationCommand");

/**
 * Executes on interaction. First check if input is slash command.
 *
 * @param {BaseInteraction} interaction
 *
 * https://old.discordjs.dev/#/docs/discord.js/main/class/BaseInteraction
 */
const execute = (interaction) => {
    debug.log(
        `User: "${interaction.member.user.username}" interacted with client`
    );
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
    execute,
};

module.exports = { interactionEvent };
