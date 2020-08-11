const Discord  = require("discord.js");

module.exports.config = {
    name: "ping",
    aliases: []
}

let talkedRecently = new Set();

module.exports.run = async(client,message,args) => {
    if(talkedRecently.has(message.author.id)) {
        let embed = new Discord.MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setTitle("Cooldown!")
        .setDescription("Command is on cooldown please wait")
        message.channel.send(embed)
        message.delete()
        return;
    }
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id);

    }, 20000)
    message.channel.send(`Your Ping is:  ${client.ws.ping}ms`)
}