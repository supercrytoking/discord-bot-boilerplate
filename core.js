const Discord = require('discord.js')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.sqlite');

exports.getLevel = (exp) => {
    return parseInt(Math.sqrt(exp / 2))
}

exports.getThreshold = (level) => {
    return parseInt(level * (level * 0.1) * 20)
}

exports.getLeaderboard = (serverid, callback) => {
    var query = 'SELECT userid,serverid,SUM(value) AS points FROM points WHERE serverid=? GROUP BY userid ORDER BY points DESC LIMIT 1000'

    db.all(query, [serverid], (err, results) => {
        if (err) {
            console.log(err)
            return
        }

        callback(results)
    })
}