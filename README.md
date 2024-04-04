Inspired to create stand-alone boiler-plate after contributions I had made to a private bot repository from [hailthekid](https://github.com/hailthekid)

#### New Features:
- Application re-factors:
  - Object oriented implementation and `Bot` class.
  - Flattened directory structure
  - Registering of event listeners and commands now follow a more common pattern
  - Clear export / import structure
- Development Tools:
  - Internal and external documentation for important utilities
  - CLI tool for registering commands with Discord API
  - `nodemon` restarts application automatically during development
  - Pre-commit hooks:
    - `eslint` - linting
    - `prettier` - formatter
  - Clear logging for additional information using `debug` library.

## Installation

1. #### Set up your Github account and install `git`.

1. #### Clone the repository.
        git clone git@github.com:dmartinezgamboa/base-discord-bot-app.git
    > https://github.com/dmartinezgamboa/base-discord-bot-app

1. #### Fork the repository and set up your remote on github.
        git remote add {your_name} git@github.com:{your_git_username}/bot

1. #### Create your own discord bot application.
    > https://discord.com/developers/applications

1. #### Setup environment variables.
        TOKEN="{YOUR_BOT_TOKEN}"
        CLIENT_ID="{YOUR_BOT_APPLICATION_ID}"
    
    > Create `.env` file in the root directory and paste variables

    > use `.envSample` as an example

1. #### Install node dependencies.
        npm install

1. #### Start the Bot application.
        npm start [--register] 

    - `--register`: Registers currently implemented slash commands with Discords API globally. See [Registering Commands](#registering-commands) for more options.
        > Registering is only necessary for the first time or when command data has been updated.
## Development

### Setup:

1. #### Install development dependencies.
        npm install -D

1. #### Install pre-commit hooks.
        npm run prepare

1. #### Run the app in development mode.
        npm run dev

    Options:
    - `--debug` Adds logging to `stdout`. For more options see [Debug Logs](#debug-logs)


### Adding Commands:

1. #### Create your command file in: `src/commands` directory, named `{myCommandName}.js`
    ```node
    const { SlashCommandBuilder } = require('discord.js')

    const myCommand = {
    data: new SlashCommandBuilder()
        .setName('myName')
        .setDescription('my description'),
    execute: execute
    }

    const execute(interaction) => { ... }

    module.exports = { myCommand }
    ```

1. #### Add your new command to the commands index: `src/commands/index.js`.
    ```node
    const { myCommand } = require(./commands.js')'

    module.exports = [myCommand, ...]
    ```
Done! The bot will set this command on the client during initialization.

Reference: https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files

### Registering Commands:

#### Usage

For any `npm` command: (`start`, `run dev` etc):

    npm start [{--register | --register-only} [--guild-id=<guild_id>] [--clear]]

- `--register`: If only option, registers the currently implemented commands globally with Discord API.
- `--register-only`: Same operation as `--register` except the application will exist once registration is complete.
- `--guild-id`: If provided along with a `--register*` option, it will register the currently implemented commands only for that specific guild.
- `--clear`: If provided with a `--register*` option, will remove any registered commands for that scope (Will be global or guild specific depending on additional options.)

#### Note:
Global commands and guild commands are separate lists.

Registering a command globally ***and*** for a guild will result in duplicated commands in the server.
> Removing a command globally does not remove it from guild lists and vice versa.

> Only necessary to run when updating commands. There is a daily limit on registering new commands.

Reference: https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

### Debug Logs:

Using `npm run dev` automatically sets the `DEBUG` environment variable, which adds additional logging while the application is running.

- Includes all logs from all scopes of the application.

> For more information on scope, see the `debug` library documentation: https://www.npmjs.com/package/debug#usage


## References

- https://discord.com/developers/docs/intro
- https://discordjs.guide/#before-you-begin
- https://old.discordjs.dev/#/docs/discord.js/14.14.1/general/welcome