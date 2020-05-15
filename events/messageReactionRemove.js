module.exports = async (client, reaction, user) => {
    var query = 'SELECT * FROM reactionroles WHERE server_id=?'

    client.db.all(query, [reaction.message.guild.id], (err, results) => {
        if (err) {
            console.log(err)
            return
        }

        for (var i in results) {
            if (reaction.message.id == results[i].message_id) {
                if (reaction.emoji.name == results[i].emoji) {
                    console.log(results[i].role)
                    reaction.message.guild.members.get(user.id).removeRole(results[i].role.replace(/\D/g,''));
                    break
                }
            }
        }
    })
}