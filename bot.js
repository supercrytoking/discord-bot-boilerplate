const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

// Load all settings from bot-settings.json into the public settings object.
exports.settings = require('./bot-settings.json')

// Load all commands into the public commands object.
exports.commands = {}
fs.readdir('./commands', (err, files) => {
    files.forEach(file => {
        var prop = require(`./commands/${file}`)
        this.commands[file.split('.')[0]] = prop
    })
})

// Annouce to the console when the bot is ready.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log(`Commands loaded: ${this.settings.prefix}${Object.keys(this.commands).join(`, ${this.settings.prefix}`)}`)
})


// Command handler...
client.on('message', message => {
    if (!message.content.startsWith(this.settings.prefix)) return

    var cmd = message.content.toLowerCase().trim()
    var args = cmd.split(' ')

    for (var i in this.commands) {
        if (cmd.startsWith(this.settings.prefix + i)) {
            this.commands[i].run(client, message, args)
        } else {
            if (this.commands[i].aliases) {
                if (this.commands[i].aliases.includes(cmd.split(this.settings.prefix)[1])) {
                    this.commands[i].run(client, message, args)
                }
            }
        }
    }
})

// Initiate the connection with Discord using the token located in the public settings object.
client.login(this.settings.token)