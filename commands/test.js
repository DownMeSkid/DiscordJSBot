const Discord = require("discord.js")


module.exports.config = {
    name: "test",
    cooldown: 10,
    aliases: []
}


module.exports.run = async (client, message, args) => {
    message.channel.send("Test")
}