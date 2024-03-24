const { SlashCommandBuilder } = require("discord.js");

const pingCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Return Websocket Heartbeat and Roundtrip Latency"),
    execute,
};

async function execute(interaction) {
    const sent = await interaction.reply({
        content: "Pinging...",
        fetchReply: true,
    });

    const websocketHeartbeat = interaction.client.ws.ping;
    const roundtripLatency =
        sent.createdTimestamp - interaction.createdTimestamp;
    const content = `
        Websocket Heartbeat: ${websocketHeartbeat}ms\nRoundtrip Latency: ${roundtripLatency}ms
    `;

    await interaction.editReply({
        content: content,
    });
}

module.exports = { pingCommand };
