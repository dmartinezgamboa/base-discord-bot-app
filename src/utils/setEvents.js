const { Client } = require("discord.js");
const { setEventsDebug: debug } = require('./debug')

/**
 * Retrieves all events listeners on start and registers to client.
 * Add new event listener in src/events.
 *
 * @param {Client} client
 * @param {Array<object>} eventListeners
 *
 * https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files
 */

const setEvents = (client, eventListeners) => {
    debug.log("#call")
    eventListeners.forEach((event) => {
        if (event.once) {
            debug.log(`registering 'once' event: '${event.name}'`)
            client.once(event.name, (...args) => {
                event.execute(...args);
            });
        } else {
            debug.log(`registering event: '${event.name}'`)
            client.on(event.name, (...args) => {
                event.execute(...args);
            });
        }
    });
}

module.exports = { setEvents: setEvents };
