class ApplicationCommandTypeNotImplemented extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApplicationCommandTypeNotImplemented);
        }

        this.name = "ApplicationCommandTypeNotImplemented";
        this.date = new Date();
    }
}

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
