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