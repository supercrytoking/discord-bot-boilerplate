const Discord = require('discord.js')

exports.run = (client, message, args) => {
    if (!message.guild) return
    if (!message.member.hasPermission('ADMINISTRATOR')) return

    if (!args) {
        message.reply('Missing args.')
    }

    if (args[1].toLowerCase() == "list") {
        var query = 'SELECT * FROM reactionroles WHERE server_id=?'

        client.db.all(query, [message.guild.id], (err, results) => {
            if (err) {
                console.log(err)
                return
            }

            console.log(results)
            
            var strings = []
            results.forEach(reactionrole => {
                strings.push(`\`${reactionrole.message_id} ${reactionrole.emoji}\` ${reactionrole.role}`)
            });

            var embed = new Discord.RichEmbed()
                .setDescription(strings.join('\r\n'))

            message.channel.send(embed)
        })
    }

    if (args[1].toLowerCase() == "add") {
        message.channel.fetchMessage(args[2]).then((message) => {
            message.react(args[3])
        }).catch()
        .finally(() => {
            if (args.length < 5) {
                message.channel.send('Usage: `!rr add [message_id] [emoji] [role]`')
            }

            console.log(args)
                
            var query = 'INSERT INTO reactionroles(server_id, message_id, emoji, role) VALUES (?, ?, ?, ?)'
            client.db.run(query, [message.guild.id, args[2], args[3], args[4]])
            message.channel.send('Reaction role created!')
        })
    }

    if (args[1].toLowerCase() == "remove") {
        var query = 'DELETE FROM reactionroles WHERE message_id=?'
        client.db.run(query, [args[2]])
    }



    // console.log(args)

    // var query = 'INSERT INTO reactionroles(server_id, message_id, emoji, role) VALUES (?, ?, ?, ?)'
    // client.db.run(query, [message.guild.id, args[1], args[2], args[3]])
}

exports.aliases = ['rr']