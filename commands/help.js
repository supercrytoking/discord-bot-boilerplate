const bot = require('../bot.js')

exports.run = (client, message, args) => {
    var searched = args[1]

    // If nothing is searched...
    if (!searched) {
        message.channel.send(`Use \`${bot.settings.prefix}commands\` to view a list of commands. Use \`${bot.settings.prefix}help [command]\` to view more information on a specific command.`)
        return
    }

    // If the search contains the prefix...
    if (searched.includes(bot.settings.prefix)) {
        console.log('has prefix')
        searched = searched.split(bot.settings.prefix)[1]
    }

    // If the command doesn't exist...
    if (!Object.keys(bot.commands).includes(searched.toLowerCase())) {
        message.channel.send(`Sorry, but I don't think that command exists. Use \`${bot.settings.prefix}commands\` for a list of commands.`)
        return
    }

    // If the command doesn't have any help information set...
    if (!bot.commands[searched].help) {
        message.channel.send(`Sorry, but I don't have information on that command.`)
        return
    }

    message.channel.send(bot.commands[searched].help)
    // message.channel.send(`\`${bot.settings.prefix}${searched}\` — ${bot.commands[searched].help}`)
}

exports.help = 'Displays more information on a specific command.'
exports.aliases = ['details']