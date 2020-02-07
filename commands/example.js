exports.run = (client, message, args) => {

    // your function

    message.channel.send('This is an example command!')
    console.log('You can run this command with !example, !test, or !admin!')
}

exports.help = 'Just an example command. Usage: `!example`'
exports.aliases = ['test', 'admin']