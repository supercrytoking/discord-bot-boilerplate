const Discord = require('discord.js')
const fs = require('fs')

// Create a Discord.Client() instance.
const client = new Discord.Client()

// Load all settings from bot-settings.json into the client's settings object.
client.settings = require('./config/bot-settings.json')

// Load all commands into the client's commands object from the /commands/ folder.
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

// Load all commands into the client's events object from the /events/ folder.
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

// Initiate the connection with Discord using the token located in the client's settings object.
client.login(client.settings.token)

// Events fired when Discord has an error.
client.on('error', (err) => console.error(err))
client.on('warn', (err) => console.warn(err))
// client.on('debug', (err) => console.info(err))