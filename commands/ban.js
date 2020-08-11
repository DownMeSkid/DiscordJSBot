const Discord = require("discord.js")

module.exports.config = {
    name: "ban",
    aliases: ["bans"]
}


module.exports.run = async(client, message, args) => {
    let reason = args.join(" ").slice(22)
    let member = message.mentions.members.first()
    if(!message.mentions.members.size){
        return message.reply("You Must Tag A User To Ban...")
    } else if (message.channel.permissionsFor(message.member).has("BAN_MEMBERS", true)){
        member.ban(reason)
        message.channel.send(`${member} Has Been Kicked :wave: `+ " For: " + `${reason}`)
    } else {
        message.channel.send(message.author.tag  + "Nice Try You Don't Have Permission To Run This Command This Has Been Reported")
    }

}
