const { Client } = require("discord.js");

/**
 * Retrieves all events listeners on start and registers to client.
 * Add new event listener in src/events.
 *
 * @param {Client} client
 * @param {Array} eventListeners
 *
 * https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files
 */

function setEvents(client, eventListeners) {
    eventListeners.forEach((event) => {
        if (event.once) {
            client.once(event.name, (...args) => {
                event.execute(...args);
            });
        } else {
            client.on(event.name, (...args) => {
                event.execute(...args);
            });
        }
        console.log(`Event: '${event.name}' set on client`);
    });
}

module.exports = { setEvents };
