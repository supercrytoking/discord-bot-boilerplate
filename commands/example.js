exports.run = (client, message, args) => {

    // your function

    message.channel.send(`This is an example command! You can run this command with ${client.settings.prefix}example, ${client.settings.prefix}test, or ${client.settings.prefix}admin!`)
}

exports.help = 'Just an example command. Usage: `${client.settings.prefix}example`'
exports.aliases = ['test', 'admin']