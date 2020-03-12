module.exports = (client, message) => {
    if (!message.content.startsWith(client.settings.prefix)) return
    var cmd = message.content.toLowerCase().trim()
    var args = cmd.split(' ')

    try {
        for (var i in client.commands) {
            if (cmd.startsWith(client.settings.prefix + i)) {
                client.commands[i].run(client, message, args)
                break
            } else {
                if (client.commands[i].aliases) {
                    if (client.commands[i].aliases.includes(args[0](client.settings.prefix)[1])) {
                        client.commands[i].run(client, message, args)
                        break
                    }
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}