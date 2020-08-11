const Discord  = require("discord.js");

module.exports.config = {
    name: "gay",
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
    let embed = new Discord.MessageEmbed()
    .setTitle("How Gay Are You?")
    .setColor(`${message.member.displayHexColor}`)
    .setDescription( "You Are: " + Math.floor((Math.random() * 100) + 1) + "%")
    .setFooter(`Requested By: ${message.author.tag}`)
    message.channel.send(embed)
 
}