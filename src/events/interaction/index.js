const { BaseInteraction } = require("discord.js");

const interactionEvent = {
    name: "interactionCreate",
    execute,
};

/**
 * Executes on interaction. First check if input is slash command.
 *
 * @param {BaseInteraction} interaction
 *
 * https://old.discordjs.dev/#/docs/discord.js/main/class/BaseInteraction
 */
async function execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    console.log(
        `User: "${interaction.member.user.username}" interacted with client`
    );

    const { commandName } = interaction;
    const command = interaction.client.commands.get(commandName);

    try {
        await command.execute(interaction);
        console.log(`Command: '${commandName}' executed`);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: `Something went wrong while executing '${commandName}'!`,
            ephemeral: true,
        });
    }
}

module.exports = { interactionEvent };
