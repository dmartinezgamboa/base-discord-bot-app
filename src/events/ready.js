const { readyEventDebug: debug } = require('../utils/debug')

const readyEvent = {
    name: "ready",
    once: true,
    execute: execute,
};

async function execute(client) {
    debug.log('#execute')
    console.log(`Ready! Logged in as '${client.user.tag}'`);
}

module.exports = { readyEvent };
