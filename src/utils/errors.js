/**
 * Implementation Notes:
 * 
 *  `super(...params)` Pass remaining arguments (including vendor specific ones) to parent constructor
 * 
 *  `if (Error.captureStackTrace)` Maintains proper stack trace for where our error was thrown (only available on V8)
 * 
 * @module Errors
 */

/** Error when missing a handler for a Application Command type Interaction */
class ApplicationCommandTypeNotImplemented extends Error {
    constructor(...params) {
        /** Pass remaining arguments (including vendor specific ones) to parent constructor */
        super(...params);

        /** Maintains proper stack trace for where our error was thrown (only available on V8) */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApplicationCommandTypeNotImplemented);
        }

        this.name = "ApplicationCommandTypeNotImplemented";
        this.date = new Date();
    }
}

/** Error when no case for the Interaction type */
class InteractionTypeNotImplementedError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InteractionTypeNotImplementedError);
        }
        this.name = "InteractionTypeNotImplementedError";
        this.date = new Date();
    }
}

/** Error when command object is missing properties */
class InvalidSlashCommand extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidSlashCommand);
        }
        this.name = "InvalidSlashCommand";
        this.date = new Date();
    }
}

/** Error when incoming command interaction is not found on the client */
class NoMatchingClientCommandNameError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NoMatchingClientCommandNameError);
        }
        this.name = "NoMatchingClientCommandNameError";
        this.date = new Date();
    }
}

module.exports = { 
    ApplicationCommandTypeNotImplemented,
    InvalidSlashCommand,
    InteractionTypeNotImplementedError,
    NoMatchingClientCommandNameError
};
