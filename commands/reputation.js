const Discord = require('discord.js');
const core = require('../core')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.sqlite');

exports.run = (client, message, args) => {
    if (!message.mentions.members.first()) {
        message.channel.send(`You must tag a player to give reputation to.`)
        return
    }

    if (message.mentions.members.first().id == message.author.id) {
        message.channel.send(`You cannot give yourself reputation.`)
        return
    }

    var rep = args[2]

    if (!rep) {
        message.channel.send(`You must set an amount to give.`)
        return
    }

    if (isNaN(rep)) {
        message.channel.send(`That's not a valid amount of reputation to give.`)
        return
    }

    if (rep > 3 || rep < -3) {
        message.channel.send(`You can only give -3 to 3 reputation.`)
        return
    }

    var amount = parseInt(rep)
    var query = 'SELECT * FROM reputation WHERE senderid=? AND receiverid=? AND serverid=?'
    db.get(query, [message.author.id, message.mentions.members.first().id, message.guild.id], (err, results) => {
        if (err) {
            console.log(err)
            return
        }
        
        if (!results) {
            var query = 'INSERT INTO reputation(senderid, receiverid, serverid, value, time) VALUES (?, ?, ?, ?, ?)'
            db.run(query, [message.author.id, message.mentions.members.first().id, message.guild.id, amount, Date.now()], (err, results) => {
                if (err) {
                    console.log(err)
                    return
                }
                
                message.channel.send(`${message.author} gave ${message.mentions.members.first()} ${amount} reputation.`)
                console.log(`${message.author.tag} gave ${message.mentions.members.first().user.tag} ${amount} reputation.`)
            })
        } else {
            var query = 'UPDATE reputation SET value=? WHERE senderid=? AND receiverid=? AND serverid=?'
            db.run(query, [amount, message.author.id, message.mentions.members.first().id, message.guild.id], (err, results) => {
                if (err) {
                    console.log(err)
                    return
                }
                
                message.channel.send(`${message.author} updated his reputation rating for ${message.mentions.members.first()} to ${amount}.`)
                console.log(`${message.author.tag} updated his reputation for ${message.mentions.members.first().user.tag} to ${amount}.`)
            })

            // message.channel.send(`${message.author} has already given ${message.mentions.members.first()} reputation.`)
            // console.log(`${message.author} has already given ${message.mentions.members.first()} reputation.`)
        }
    })
}

exports.help = 'Give or take reputation from other members.'
exports.aliases = ['rep']