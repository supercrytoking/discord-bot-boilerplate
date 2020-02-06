exports.run = (client, message, args) => {
    var searched = args[1]

    // If nothing is searched...
    if (!searched) {
        message.channel.send(`Use \`${client.settings.prefix}commands\` to view a list of commands. Use \`${client.settings.prefix}help [command]\` to view more information on a specific command.`)
        return
    }bot

    // If the search contains the prefix...
    if (searched.includes(client.settings.prefix)) {
        console.log('has prefix')
        searched = searched.split(client.settings.prefix)[1]
    }

    // If the command doesn't exist...
    if (!Object.keys(client.commands).includes(searched.toLowerCase())) {
        message.channel.send(`Sorry, but I don't think that command exists. Use \`${client.settings.prefix}commands\` for a list of commands.`)
        return
    }

    // If the command doesn't have any help information set...
    if (!client.commands[searched].help) {
        message.channel.send(`Sorry, but I don't have information on that command.`)
        return
    }

    message.channel.send(client.commands[searched].help)
    // message.channel.send(`\`${client.settings.prefix}${searched}\` — ${client.commands[searched].help}`)
}

exports.help = 'Displays more information on a specific command.'
exports.aliases = ['details']