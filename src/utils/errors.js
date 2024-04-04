class ApplicationCommandNotImplemented extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApplicationCommandNotImplemented);
        }

        this.name = "ApplicationCommandNotImplemented";
        this.date = new Date();
    }
}

class ApplicationCommandError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApplicationCommandError);
        }

        this.name = "ApplicationCommandError";
        this.date = new Date();
    }
}

class DebuggerArgumentError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DebuggerArgumentError)
        }

        this.name = "DebuggerArgumentError"
        this.date = new Date()
    }
}

module.exports = { 
    ApplicationCommandNotImplemented,
    ApplicationCommandError,
    DebuggerArgumentError
};
