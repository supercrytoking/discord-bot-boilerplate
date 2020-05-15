const Discord = require('discord.js')
const core = require('../core.js')

exports.run = (client, message, args) => {
    var embed = new Discord.RichEmbed()
        .setTitle('Invite Buup')
        .setThumbnail(client.user.avatarURL)
        .setURL('https://discordapp.com/api/oauth2/authorize?client_id=651994627057909760&permissions=8&scope=bot')
        .setDescription(`**Invite Buup** to your server! I help track levels in **${client.guilds.size} other servers** just like yours. \r\n\r\n[**Click here to invite Buup to your server.**](http://underforums.com/buup-bot)`)

    message.channel.send(embed)
}