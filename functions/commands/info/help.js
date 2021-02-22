const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { prefix, master, maid, keywords, specKeywords, meanKeywords, niceKeywords, botemojis } = require("../../../config/config.json")
const { sleep, formatDate } = require('../../basic');

module.exports = {
    name: "help",
    category: "info",
    description: "Displays a wonderful embed of help pages",
    aliases: ["?", "h"],
    usage: "none",
    run: async (client, msg, args) => {

        let name = msg.author.username
        let command = client.commands.get('help')

        let fun = [];
        let info = [];
        let moderation = [];
        let masteronly = [];

        await client.commands.each(cmd => {
            if (cmd.category == "fun") {
                fun.push(`**>> ${cmd.name}**: ${cmd.description}`)
            } else if (cmd.category == "info") {
                info.push(`**>> ${cmd.name}**: ${cmd.description}`)
            } else if (cmd.category == "moderation") {
                moderation.push(`**>> ${cmd.name}**: ${cmd.description}`)
            } else if (cmd.category == "master") {
                masteronly.push(`**>> ${cmd.name}**: ${cmd.description}`)
            }
        });

        fun.join('\n')
        info.join('\n')
        moderation.join('\n')
        masteronly.join('\n')

        let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription('Some commands will be disabled if Miss Emilia is in the discord.')
            .setColor(msg.member.displayHexColor == "#000000" ? "#FFFFFF" : msg.member.displayHexColor)
            .addField("Fun", fun)

            .addField("Info", info)
            
            .addField("Moderation", moderation)
            
            .addField("Master Only", masteronly)
            .setFooter(`${msg.author.id == master ? "My Master" : name} used ${prefix}${command.name}! It made the help embed appear! Use ram!{cmd} info for more information on a specific command.`, msg.author.displayAvatarURL())
            
        msg.reply(embed)
        
    }
}