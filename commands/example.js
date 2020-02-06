exports.run = (client, message, args) => {

    // your function

    console.log('This is an example command!')
    message.channel.send('This is an example command!')
}
exports.help = 'Just an example command. Usage: `+exmaple`'
exports.aliases = ['test', 'admin']