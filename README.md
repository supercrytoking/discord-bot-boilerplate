# Discord Bot Boilerplate
A boilerplate to quickly deploy a powerful Discord bot.

# Features
- [x] 100% free and open source.
- [x] Fully customizabled, host on your own server!
- [x] Deploy in > 1 minute.
- [x] Extemely lightweight, less than 1MB.
- [x] Powerful command handler.
- [x] Example commands to expand from.
- [x] Built in `+commands` and `+help` commands.
- [ ] Bloated, unnecessary features.
- [ ] Complex set-up.
- [ ] Premium or paid packages.

# How-to / Setup
Prerequisites:
- NodeJS installed on the machine.
- Your Discord bot's token.
- Your Discord bot invited to your server.
- A brain.

1. Download/clone the repo.
2. Insert your Discord bot token in `bot-settings.json`.
3. Open a Terminal window, and navigate to your project by using `cd /path/to/this/repo`.
4. Run `npm i` to download the dependancies (only [discord.js](https://discord.js.org)!).
5. Run `node bot.js` to initiate the bot.

# Usage
This boilerplate features a quick and powerful commmand handler to dynamically load and managed each command. Commands are stored in the `/commands/` folder and have 3 main functions:
- `exports.run`: The main function of the command.
- `exports.help`: The descripion of the commands. Appears when a users runs `+commands [command]`.
- `exports.aliases`: The aliases of the command. A command can be run using it's main name or one of it's aliases. A good example is setting an alias of `+balance` to `+bal` so that both commands do the same thing.

## Example Command
`/commands/examples.js`
```javascript
exports.run = (message, client, args) => {

    // your function

    message.channel.send('This is an example command!')
    console.log('You can run this command with +example, +test, or +admin!')
}

exports.help = 'Just an example command. Usage: `+exmaple`'
exports.aliases = ['test', 'admin']
```

# FAQ
How can I change the bot's prefix?
- The prefix is defined in the `bot-settings.json` file.

Can you develop a bot for me?
- I'd love to! Reach out to me if you'd like to hire me.