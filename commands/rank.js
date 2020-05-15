const Discord = require('discord.js')
const async = require('async')

var core = require('../core')

var getRank = (client, server, target, callback) => {
    async.series([
        function (callback) {
            var query = 'SELECT SUM(value) AS total FROM points WHERE userid=? AND serverid=?'
            client.db.all(query, [target.id, server], (err, results) => {
                if (err) {
                    console.log(err)
                    return
                }

                if (results[0].total == null) results[0].total = 0
                callback(null, results[0].total)
            })
        },
        function (callback) {
            var query = 'SELECT SUM(value) AS total FROM reputation WHERE receiverid=? AND serverid=?'
            client.db.all(query, [target.id, server], (err, results) => {
                if (err) {
                    console.log(err)
                    return
                }

                if (results[0].total == null) results[0].total = 0
                callback(null, results[0].total)
            })
        },
        function (callback) {
            core.getLeaderboard(server, (leaderboard) => {
                var count = 0
                for (var i in leaderboard) {
                    count++
                    if (leaderboard[i].userid == target.id) {
                        callback(null, count)
                        return
                    }
                }
            })
        }
    ], (err, results) => {
        var level = parseInt(Math.sqrt(results[0] / 2))
        var exp = results[0]
        var rep = results[1]
        var threshold = parseInt((level + 1) * ((level + 1) * 0.1) * 20)
        var rank = results[2]

        var info = {
            level: level,
            exp: exp,
            rep: rep,
            threshold: threshold,
            levelup: threshold - exp,
            rank: rank
        }

        callback(info)
    })
}

exports.run = (client, message, args) => {
    var server = message.guild.id
    var target = message.author

    if (message.mentions.members.first()) {
        target = message.mentions.members.first().user
    }

    getRank(client, server, target, (info) => {
        var embed = new Discord.RichEmbed()
            .setTitle(target.tag)
            .setThumbnail(target.avatarURL)
            .setDescription(
                `**Level:** ${info['level']}\r\n` +
                `**Total EXP:** ${info['exp']}\r\n` +
                `**Reputation:** ${info['rep']}\r\n` +
                `**Rank:** #${info['rank']}\r\n`
                )
            .setFooter(`${info['levelup']} EXP until level up.`)

        message.channel.send(embed)
    })
}

exports.help = 'View your rank.'
exports.aliases = ['level']