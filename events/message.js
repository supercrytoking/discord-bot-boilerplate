var addPoint = (client, message) => {
    console.log(`Granting points to ${message.author.tag}.`)
    var query = 'INSERT INTO points(userid, serverid, value, time) VALUES (?, ?, ?, ?)'
    client.db.run(query, [message.author.id, message.guild.id, 1, parseInt(Date.now())])
}

var doEXP = (client, message) => {
    var query = 'SELECT * FROM points WHERE userid=? AND serverid=? ORDER BY time DESC LIMIT 1'
    client.db.get(query, [message.author.id, message.guild.id], (err, results) => {
        if (!results) {
            addPoint(client, message)
            return
        }

        var timeSince = (Date.now() - results.time) / 1000
        if (timeSince > 60) {
            addPoint(client, message)
            return
        }

        console.log(`${message.author.tag} must wait ${parseInt(60 - timeSince)} seconds for more exp.`)
    })
}

module.exports = (client, message) => {
    if (message.author.bot) return
    if (message.guild == null) {
        message.channel.send('I only work in servers. Sorry!')
        return
    }

    doEXP(client, message)

    if (message.channel.name == 'suggestions') {
        message.react('❎')
        message.react('✅')
    }

    if (!message.content.startsWith(process.env.BOT_PREFIX)) return

    var cmd = message.content.toLowerCase().trim()
    var args = cmd.split(' ')

    try {
        for (var i in client.commands) {
            if (cmd.startsWith(process.env.BOT_PREFIX + i)) {
                client.commands[i].run(client, message, args)
                break
            } else {
                if (client.commands[i].aliases) {
                    if (client.commands[i].aliases.includes(args[0].split(process.env.BOT_PREFIX)[1])) {
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