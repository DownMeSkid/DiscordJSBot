const Discord = require("discord.js");


module.exports.config ={
    name: "kick",
    aliases: ["kickuser"]
}


module.exports.run = async (client, message, args) => {
    const reason = args.join(" ").slice(22)
    let member = message.mentions.members.first()
    if(!message.mentions.members.size){
        return message.reply("You Must Tag A User To Kick!")
    } else if(message.channel.permissionsFor(message.member).has("KICK_MEMBERS", true)){
        member.kick(reason)
        message.channel.send(`${member} Has Been Kicked :wave: `+ " For: " + `${reason}`)
        message.delete()
    } else {
        message.channel.send(`${message.author.tag} Nice Try You Don't Have Permissions To Use This Command` )
}
}