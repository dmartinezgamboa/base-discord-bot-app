const { debug } = require('../../utils/debugger')

const handleApplicationCommand = async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        const command = interaction.client.commands.get(commandName);

        try {
            await command.execute(interaction);
            debug.log(`Command: '${commandName}' executed`);
        } catch (error) {
            debug.error(error);
            await interaction.reply({
                content: `Something went wrong while executing '${commandName}'!`,
                ephemeral: true,
            });
        }
    }
};

module.exports = { handleApplicationCommand };
