const { BaseInteraction, ApplicationCommandType } = require("discord.js");
const { ApplicationCommandNotImplemented } = require("../../utils/errors");
const { handleApplicationCommand } = require("./handleApplicationCommand");

/**
 * Executes on interaction. First check if input is slash command.
 *
 * @param {BaseInteraction} interaction
 *
 * https://old.discordjs.dev/#/docs/discord.js/main/class/BaseInteraction
 */
const execute = (interaction) => {
    console.log(
        `User: "${interaction.member.user.username}" interacted with client`
    );
    switch (interaction.type) {
        case ApplicationCommandType.User:
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