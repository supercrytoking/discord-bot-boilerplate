const Discord = require('discord.js')
const fs = require('fs')

// Create + export the Discord.Client() instance so it's accessible in all files.
const client = new Discord.Client()
exports.client = client

// Load all settings from bot-settings.json into the public settings object.
client.settings = require('./config/bot-settings.json')

// Load all commands into the public commands object from the /commands/ folder.
client.commands = {}
fs.readdir('./commands', (err, files) => {
    files.forEach(file => {
        var prop = require(`./commands/${file}`)
        client.commands[file.split('.')[0]] = prop
    })
})

// Annouce to the console when the bot is ready.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log(`Commands loaded: ${client.settings.prefix}${Object.keys(client.commands).join(`, ${client.settings.prefix}`)}`)
})

// Handle commands.
client.on('message', message => {
    if (!message.content.startsWith(client.settings.prefix)) return

    var cmd = message.content.toLowerCase().trim()
    var args = cmd.split(' ')

    for (var i in client.commands) {
        if (cmd.startsWith(client.settings.prefix + i)) {
            client.commands[i].run(client, message, args)
            break
        } else {
            if (client.commands[i].aliases) {
                if (client.commands[i].aliases.includes(cmd.split(client.settings.prefix)[1])) {
                    client.commands[i].run(client, message, args)
                    break
                }
            }
        }
    }
})

// Initiate the connection with Discord using the token located in the public settings object.
client.login(client.settings.token)