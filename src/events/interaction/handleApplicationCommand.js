const handleApplicationCommand = async (interaction) => {
    if (interaction.isChatInputCommand()) {
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
};

module.exports = { handleApplicationCommand };
