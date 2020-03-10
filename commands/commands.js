exports.run = (client, message, args) => {
    console.log(client.commands)
    
    message.channel.send(
        `Commands: \`${client.settings.prefix}` +
        Object.keys(client.commands).join(`\`, \`${client.settings.prefix}`) + '`'
    )
}

exports.help = 'Displays a list of available commands.'
exports.aliases = ['commandlist', 'command']