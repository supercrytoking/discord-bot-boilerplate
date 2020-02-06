# Discord Bot Boilerplate
A boilerplate to quickly deploy a powerful Discord bot. Quickly and painlessly deploy a powerful, lightweight and extremely easy-to-manage Discord bot for both beginners and expert users. No experiece needed.

# Features
- [x] 100% free and open source.
- [x] Fully customizable, host on your own server!
- [x] Quick deployment: Get the bot online in > 1 minute.
- [x] Extremely lightweight, less than 1MB.
- [x] Fully commented: Easy for a new developer to understand and navigate.
- [x] Powerful command handler.
- [x] Example commands to expand from.
- [x] Built in `!commands` and `!help` commands.
- [ ] Bloated, unnecessary, complex, or downright annoying features.
- [ ] Complex set-up.
- [ ] Premium or paid packages.

# How-to / Setup
Prerequisites:
- NodeJS installed on the machine.
- Your Discord bot's token.
- Your Discord bot invited to your server.
- A brain.

1. Download/clone the repo.
2. Place your Discord bot's token in `bot-settings.json`.
3. Open a Terminal (Console) window, and navigate to your project by using `cd /path/to/this/repo`.
4. Run `npm i` to download the dependencies.
5. Run `node bot.js` to initiate the bot.

# Usage
This boilerplate features a quick and powerful commmand handler to dynamically load and managed each command. Commands are stored in the `/commands/` folder and have 3 main functions:
- `exports.run`: The main function of the command.
- `exports.help`: The descripion of the commands. Appears when a users runs `!commands [command]`.
- `exports.aliases`: The aliases of the command. A command can be run using it's main name or one of it's aliases. A good example is setting an alias of `!balance` to `!bal` so that both commands do the same thing.

### Example Command
`/commands/examples.js`
```javascript
exports.run = (client, message, args) => {

    // your function

    message.channel.send('This is an example command!')
    console.log('You can run this command with !example, !test, or !admin!')
}

exports.help = 'Just an example command. Usage: `!example`'
exports.aliases = ['test', 'admin']
```

Upon running a command in the Discord chat, the command handler will intelligently find the command's `.js` file in the `/commands/` folder and run the `exports.run` function located within it.

### Working with the Command Handler
The boilerplate features 2 exports that are extremely useful in dynamically managing your bot's commands:
- `bot.settings`: An object that contains all the information in the `bot-setings.json`. For example, you can quickly find the bot's prefix by using `bot.settings.prefix`.
- `bot.commands`: An object that contains all the information and functions for every command. For example, you can pull the help information on a command by using `bot.commands['command-name'].help`.

This makes it really easy to manage the commands on a global level. To access the bot's scopes from your `.js` file, you'll need to import it using a  `require` somewhere near the top.

```javascript
const bot = require('./bot.js')
```

A good example of this in use is the `!help` command, which lists all the available commands the bot has to offer.

```javascript
const bot = require('../bot.js')

exports.run = (client, message, args) => {
    console.log(bot.commands)

    message.channel.send(
        `Commands: \`${bot.settings.prefix}` +
        Object.keys(bot.commands).join(`\`, \`${bot.settings.prefix}`) + '`'
    )
}

exports.help = 'Displays a list of available commands.'
exports.aliases = ['commandlist', 'command']
```
> Commands: !commands, !example, !help

# FAQ
How can I change the bot's prefix?
- The prefix is defined in the `bot-settings.json` file.

Does this bot moderation feature commands like `!purge`, `!kick`, and `!ban`?
- It does not. This is boilerplate for developers to develop their own commands for their Discord server—not quite a moderation/utility bot.

How can I host my bot when I'm away from my machine, 24/7?
- For that, you'll need to run the program on a remote machine. You'll need a VPS of your own. [You can get a VPS for less than $10/month on https://bugplay.com!](https://bugplay.com)

<!-- Why do you provide this for free?
- Because I enjoy it! -->

Can you develop a bot for me?
- I'd love to! Reach out to me if you'd like to hire me.