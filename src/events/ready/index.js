const { log } = require('../../utils/debugger')

const readyEvent = {
    name: "ready",
    once: true,
    execute: log(__filename, execute),
};

async function execute(client) {
    console.log(`Ready! Logged in as '${client.user.tag}'`);
}

module.exports = { readyEvent };
