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

module.exports = { ApplicationCommandNotImplemented };