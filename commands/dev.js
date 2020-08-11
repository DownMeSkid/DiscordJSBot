const Discord = require("discord.js")
const moment = require("moment")
module.exports.config = {
    name: "dev",
    aliases: ['info']
}


let talkedRecently = new Set();
module.exports.run = async(client, message ,args) => {
    // CoolDown Handling TODO Refractor
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

    // Uptime Handling

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let uptime = `${days} days, ${hours} hours ${minutes} minutes`;


    // Embed Handling
    let embed = new Discord.MessageEmbed()
    .setColor(0xFF0092)
    .setAuthor("Slays | 殺人 ")
    .addField("Version", "1.0", true)
    .addField("Node JS", "14.7.8", true)
    .addField("Library", `[Discord.js](https://discord.js.org/#/)` , true)
    .addField(`Servers`, `${client.guilds.cache.size}`, true)
    .addField(`Users`, `${client.users.cache.size}`, true)
    .addField(`Uptime`, `${uptime}`, true)
    .addField("Website", "Soon", true)
    .addField("Discord", `[Invite](https://discord.gg/dfUhjT6)`, true)
    .addField('Invite', `[Soon](https://discord.gg/dfUhjT6)` ,true)
    .addField("Developer", "/home/slays#6666", true)
    .setFooter("Prefix ! | This Bot is still under construction")
    .setTimestamp()
    message.channel.send(embed)


}
