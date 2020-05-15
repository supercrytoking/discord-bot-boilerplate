const Discord = require('discord.js')
var core = require('../core')

exports.run = (client, message, args) => {
    core.getLeaderboard(message.guild.id, (leaderboard) => {

        var body = []

        var search = 10
        if (Object.keys(leaderboard).length < 10) {
            search = Object.keys(leaderboard).length
        }

        for (var i = 0; i < search; i++) {
            var points = leaderboard[i].points;
            body.push(`${i + 1}. **Level:** ${core.getLevel(points)} (${points}) <@${leaderboard[i].userid}>`)
        }

        var embed = new Discord.RichEmbed()
            .setTitle('Activityboard')
            .setDescription(body.join('\r\n'))

        message.channel.send(embed)
    })
}

exports.help = 'View the leaderboard.'
exports.aliases = ['lb', 'ranks', 'levels']