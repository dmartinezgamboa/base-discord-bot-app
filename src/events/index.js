const { readyEvent } = require("./ready");
const { interactionEvent } = require("./interaction");

module.exports = [readyEvent, interactionEvent];
