Inspired create stand-alone boiler-plate after contributions I had made to a private bot repository from [hailthekid](https://github.com/hailthekid)

## New Features:
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
        npm run register
    > Registering your commands is required to use slash commands. 

    > This must be done at least once and whenever you want to add / remove commands. See [Registering Commands](#registering-commands)

        npm start

## Development

### Setup:

1. #### Install development dependencies.
        npm install -D

1. #### Install pre-commit hooks.
        npm run prepare

1. #### Run the app in development mode.
        npm run dev

### Adding Commands:
> https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files

1. #### Create your command file in: `src/commands` directory.
    ```node
    const { SlashCommandBuilder } = require('discord.js')

    const myCommand = {
    data: new SlashCommandBuilder()
        .setName('myName')
        .setDescription('my description'),
    execute
    }

    async function execute(interaction) { ... }

    module.exports = { myCommand }
    ```

1. #### Add your new command to the commands index: `src/commands/index.js`.
    ```node
    const { myCommand } = require(./commands.js')'

    module.exports = [ ... , myCommand]
    ```
Done! The bot will set this command on the client during initialization.

### Registering Commands:

Included is a CLI tool that allows for managing your bots registered commands.

#### Usage:

    npm run register [--guild_id=<guild_id>] [--remove]

> If no options are given, it will register the currently implemented commands globally for all guilds the bot is currently in.

#### Options:

    --guild_id=<guild_id>

> register commands for guild

    --remove               
> remove all commands from registered list

#### Note: 
Global commands and guild commands are separate lists.

Registering a command globally ***and*** for a guild will result in duplicated commands in the server.
> Removing a command globally does not remove it from guild lists and vice versa.

> Only necessary to run when updating commands. There is a daily limit on registering new commands.

https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

## References:

- https://discord.com/developers/docs/intro
- https://discordjs.guide/#before-you-begin
- https://old.discordjs.dev/#/docs/discord.js/14.14.1/general/welcome