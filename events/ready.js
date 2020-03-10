module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log(`Commands loaded: ${client.settings.prefix}${Object.keys(client.commands).join(`, ${client.settings.prefix}`)}`)
}