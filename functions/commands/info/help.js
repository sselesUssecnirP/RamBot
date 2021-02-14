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

        let name = msg.author.username
        let command = client.commands.get('help')

        let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription('Some commands will be disabled if Miss Emilia is in the discord.')
            .setColor(msg.member.displayHexColor == "#000000" ? "#FFFFFF" : msg.member.displayHexColor)
            .addField("Info", `**>> Help**: Displays this page.\n**>> SubList**: Gives you a list of all the submissions in your discord for a particular submission box.`, { inline: true })
            .addField("Moderation", `**>> SubCreate**: With permission, this command will create a submissions box in a particular channel with a certain list_key.\n**>> SubRemove**: With permission, will remove the particular submisisons box using it's list_key to find it.\n**>> Report**: If guild has a report channel, this will send your message there along with the @'d user's information.\n**>> Say**: Sends an embed message to a channel.\n**>> TempAdmin**: IF guild has set up the command, this will give you an admin role for a time up to 2 hours.\n**>> UserInfo**: This command will provide information on a particular user.`, { inline: true })
            .addField("Master Only", `**>> grabGuildSaves**: Allows my master to grab a .zip file of ALL of my saves.\n**>> invite**: My master and one of his maids has access to display an embed that gives a link to invite me to your server. If I'm not in The Broken Kingdom, I'll also provide an invite link there.`, { inline: true })
            .setFooter(`${name} used ${prefix}${command.name}! It made the help embed appear!`, msg.author.displayAvatarURL())
            
        msg.reply(embed)
        
    }
}