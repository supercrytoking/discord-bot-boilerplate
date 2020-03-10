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
    try {
        files.forEach(file => {
            var prop = require(`./commands/${file}`)
            client.commands[file.split('.')[0]] = prop
        })
    } catch (err) {
        console.log(err)
    }
})

client.events = {}
fs.readdir('./events', (err, files) => {
    try {
        files.forEach(file => {
            var eventName = file.split('.')[0]
            var prop = require(`./events/${file}`)

            client.events[eventName] = prop
            client.on(eventName, prop.bind(null, client));
        })
    } catch (err) {
        console.log(err)
    }
})

// Initiate the connection with Discord using the token located in the public settings object.
client.login(client.settings.token)

// Handle Discord errors.
client.on('error', (err) => console.error(err))
client.on('warn', (err) => console.warn(err))
// client.on('debug', (err) => console.info(err))