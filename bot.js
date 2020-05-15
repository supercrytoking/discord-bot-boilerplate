require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.sqlite')

const client = new Discord.Client()
client.db = db
// client.settings = require('./config/bot-settings.json')

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
            client.on(eventName, prop.bind(null, client))
        })
    } catch (err) {
        console.log(err)
    }
})

client.login(process.env.BOT_TOKEN)

client.on('error', (err) => console.error(err))
client.on('warn', (err) => console.warn(err))
// client.on('debug', (err) => console.info(err))

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error))