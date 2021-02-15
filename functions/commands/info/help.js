const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { prefix, owner, maid, keywords, specKeywords, meanKeywords, niceKeywords, botemojis } = require("../../../config/config.json")
const { sleep, formatDate } = require('../../basic');

module.exports = {
    name: "help",
    category: "info",
    description: "Displays a wonderful embed of help pages",
    aliases: ["?", "h"],
    usage: "",
    run: async (client, msg, args) => {

        console.log("I'm here")

        let name = msg.author.username
        let command = client.commands.get('help')

        let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription('Some commands will be disabled if Miss Emilia is in the discord.')
            .setColor(msg.member.displayHexColor == "#000000" ? "#FFFFFF" : msg.member.displayHexColor)
            .addField("Info", stripIndents`**>> Help**: Displays this page.
            **>> SubList**: Gives you a list of all the submissions in your discord for a particular submission box.`)
            
            .addField("Moderation", stripIndents`**>> SubCreate**: With permission, this command will create a submissions box in a particular channel with a certain list_key.
            **>> SubRemove**: With permission, will remove the particular submisisons box using it's list_key to find it.
            **>> Report**: If guild has a report channel, this will send your message there along with the @'d user's information.
            **>> Say**: Sends an embed message to a channel.
            **>> TempAdmin**: IF guild has set up the command, this will give you an admin role for a time up to 2 hours.
            **>> UserInfo**: This command will provide information on a particular user.`)
            
            .addField("Master Only", stripIndents`**>> grabGuildSaves**: Allows my master to grab a .zip file of ALL of my saves.
            **>> invite**: My master and one of his maids has access to display an embed that gives a link to invite me to your server. If I'm not in The Broken Kingdom, I'll also provide an invite link there.`)
            .setFooter(`${msg.author.id == owner ? name : "My master"} used ${prefix}${command.name}! It made the help embed appear!`, msg.author.displayAvatarURL())
            
        
        console.log("I made the embed")
        msg.reply(embed).then(() => console.log("I sent the message!"))
        
    }
}