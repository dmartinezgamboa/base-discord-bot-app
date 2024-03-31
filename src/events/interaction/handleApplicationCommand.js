const { log } = require('../../utils/debugger')

const handleApplicationCommand = async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        const command = interaction.client.commands.get(commandName);

        await command.execute(interaction);
    }
};

module.exports = { handleApplicationCommand: log(__filename, handleApplicationCommand)  };
