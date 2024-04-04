const { BaseInteraction, InteractionType } = require("discord.js");
const { interactionCreateDebug: debug } = require('../utils/debug')
const {
    ApplicationCommandTypeNotImplemented,
    InteractionTypeNotImplementedError,
    NoMatchingClientCommandNameError
} = require("../utils/errors");

/**
 * Executes on interaction. First check if input is slash command.
 *
 * https://old.discordjs.dev/#/docs/discord.js/main/class/BaseInteraction
 * 
 * @param {BaseInteraction} interaction
 */
const execute = (interaction) => {
    debug.log('#execute')
    try {
        switch (interaction.type) {
            case InteractionType.ApplicationCommand:
                debug.log(`interaction type: ${interaction.type}`)
                handleApplicationCommand(interaction);
                break;
            case InteractionType.MessageComponent:
                debug.log(`interaction type: ${interaction.type}`)
                handleMessageComponent(interaction);
                break;
            case InteractionType.ModalSubmit:
                debug.log(`interaction type: ${interaction.type}`)
                handleModalSubmit(interaction);
                break;
            default:
                throw new InteractionTypeNotImplementedError(
                    "Unhandled InteractionType"
                );
        }
    } catch(error) {
        debug.error(error)
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

const handleMessageComponent = async (interaction) => {
    try {
        throw new ApplicationCommandTypeNotImplemented(`ApplicationCommand handler for type: ${interaction.type} not implemented`)
    } catch(error) {
        debug.error(error)
    }
}

const handleModalSubmit = async (interaction) => {
    try {
        throw new ApplicationCommandTypeNotImplemented(`ApplicationCommand handler for type: ${interaction.type} not implemented`)
    } catch(error) {
        debug.error(error)
    }
}

const interactionEvent = {
    name: "interactionCreate",
    execute: execute,
};

module.exports = { interactionEvent };
