const { readyEventDebug: debug } = require('../utils/debug')

const execute = async (client) => {
    debug.log('#execute')
    console.log(`Ready! Logged in as '${client.user.tag}'`);
}

const readyEvent = {
    name: "ready",
    once: true,
    execute: execute,
};

module.exports = { readyEvent };
