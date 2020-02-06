const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

exports.settings = require('./bot-settings.json')

// Load all commands in public commands object.
exports.commands = {}
fs.readdir('./commands', (err, files) => {
    files.forEach(file => {
        var prop = require(`./commands/${file}`)
        this.commands[file.split('.')[0]] = prop
    })
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log(`Commands loaded: ${this.settings.prefix}${Object.keys(this.commands).join(`, ${this.settings.prefix}`)}`)
})

client.on('message', message => {
    if (!message.content.startsWith(this.settings.prefix)) return

    var cmd = message.content.toLowerCase().trim()
    var args = cmd.split(' ')

    for (var i in this.commands) {
        if (cmd.startsWith(this.settings.prefix + i)) {
            this.commands[i].run(message, client, args)
        } else {
            if (this.commands[i].aliases) {
                if (this.commands[i].aliases.includes(cmd.split(this.settings.prefix)[1])) {
                    this.commands[i].run(message, client, args)
                }
            }
        }
    }
})

client.login(this.settings.token)