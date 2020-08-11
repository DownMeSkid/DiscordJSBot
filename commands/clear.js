const Discord = require('discord.js');

module.exports.config = {
    name: "purge",
    aliases: ["clear"]
}

let talkedRecently = new Set();

module.exports.run = async(client, message, args) => {
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

    }, 15000)
    let authRoles = message.guild.roles.cache.find(role => role.name ===  "Admins")

    if(message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES", true)){
        let deleteCount = parseInt(args[0], [10]);

        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Please provice a number between 2 and 150 for the number of message to delete");

        let fetched = await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
        .catch(error => message.reply("Couldn't Delete Messages Because of: " + `${error}`))
    } else {
        message.reply("You Don't Have Permission To Use This Command...")
    }
}