exports.run = (client, message, args) => {
    var amount = parseInt(args[1])
    
    if (isNaN(amount)) {
        message.reply('That doesn\'t seem to be a valid number.')
        return
    }

    var math = amount * 2.205

    message.channel.send(math)
}