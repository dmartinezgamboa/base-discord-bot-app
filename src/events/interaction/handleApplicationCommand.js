const { handleApplicationCommandDebug: debug } = require('../../utils/debug')

const handleApplicationCommand = async (interaction) => {
    debug.log('#call')
    if (interaction.isChatInputCommand()) {
        debug.log("application command type: 'ChatInputCommand'")

        const { commandName } = interaction;
        const command = interaction.client.commands.get(commandName);

        await command.execute(interaction);
    }
};

module.exports = { handleApplicationCommand: handleApplicationCommand };
