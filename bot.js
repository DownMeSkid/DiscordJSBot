const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const config = require("./config/blacklist.json")



client.on("ready", () => {
    console.log(`${client.user.tag}: Has Logged in and is online`)
})

// For Command Handling
const fs = require("fs");
const { default: Collection } = require("@discordjs/collection");
client.commands = new Collection()
client.aliases = new Collection()

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if(jsFile.length <= 0) {
        return console.log("Coudln't Find Commands")
    }

    jsFile.forEach((file, i ) => {
        let pullcmd = require(`./commands/${file}`)
        client.commands.set(pullcmd.config.name, pullcmd)
        pullcmd.config.aliases.forEach(alias => {
            client.aliases.set(alias, pullcmd.config.name)
        })
    })
})

client.on("message", async message => {
let messageArray = message.content.split(" ")
let cmd = messageArray[0]
let args = messageArray.slice(1)

if(!message.content.startsWith(process.env.PREFIX)){
    return;
} 
let commandFile = client.commands.get(cmd.slice(process.env.PREFIX.length).toLowerCase()) || client.commands.get(client.aliases.get(cmd.slice(process.env.PREFIX.length).toLowerCase()))
if(commandFile) commandFile.run(client, message, args); else {
    message.channel.send("Command Not Found")
}
})



// Listens for blacklisted words
client.on('message', message => {
    if(config.BLACKLISTED.some(word => message.content.toLowerCase().includes(word))){
        message.delete()
        let banned = new Discord.MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setTitle("Banned Word")
        .setDescription("Please Refrain form saying bad or offensive words thanks")
        message.reply(banned)
    } 
})


// Event For Welcome Message
client.on("guildMemberAdd", member => {
    let joined = new Discord.MessageEmbed()
    .setColor("#33bbff")
    .setTitle("Weclome To The Server")
    .setDescription(`Weclome To  ${member.guild.name} <@${member.user.id}>`)
    .setThumbnail(`${member.user.avatarURL()}`)
    .setTimestamp()
    client.channels.cache.get("742054772663648338").send(joined)
    member.roles.add("742052613713035274")
})

client.on("messageDelete", message =>{
    let deleted = new Discord.MessageEmbed()
    .setTitle("Deleted Message Alert")
    .setColor(message.member.displayHexColor)
    .addField("Author", message.author.tag, true)
    .addField("Channel", message.channel, true)
    .addField("Message", message.cleanContent)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    client.channels.cache.find(channel => channel.name === "logs").send(deleted)


})

client.login(process.env.TOKEN)