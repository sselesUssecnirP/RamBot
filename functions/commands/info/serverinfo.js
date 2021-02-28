const { formatDate } = require('../../basic');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "serverinfo",
    category: "info",
    description: "A command to acquire information about a user.",
    aliases: ["whatis", "what", "sinfo"],
    usage: "<username | id | mention>",
    run: async (client, msg, args) => {
        
        if (msg.channel.type == 'DM')
            return msg.reply("This is a direct message. You cannot get information about the server you're in from here.")

        let guild = msg.guild

        const joined = formatDate(msg.member.joinedAt);

        const roles = guild.roles.cache
            .filter(r => r.id != msg.guild.id)
            .map(r => r)
            .join(", ") || "none"
        
        const created = formatDate(guild.createdAt)

        const embed = new MessageEmbed()
            .setTitle('Serverinfo')
            .setFooter(guild.name, guild.iconURL)
            .setThumbnail(guild.iconURL)
            .setColor(msg.member.displayHexColor === "#000000" ? "#ffffff" : msg.member.displayHexColor)

            .addField("Guild Information", stripIndents`**> Name:** ${guild.name}
            **>> ID:** ${guild.id}
            **>> Created At:** ${created}
            **>> Description:** ${guild.id}${guild.rulesChannel ? `
            **>> Rules Channel:** <#!${guild.rulesChannelID}>` : ``}
            **>> Population:** ${guild.membersCount}${guild.vanityURLCode ? `
            **>> Vanity URL:** ${guild.vanityURLCode}
            **>> Vanity URL Uses:** ${guild.vanityURLUses}` : ``}
            `, true)
            
            .addField("Other Information", `**>> Joined At:** ${joined}
            **>> Voice Region:** ${guild.region}${guild.partnered ? `
            >>** Partnered:** Yes` : ``}${guild.verified ? `
            >>** Verified:** Yes` : ``}
            **>> Roles:** ${roles}`, true)

            .setTimestamp()

        if (guild.bannerURL) {
            embed.setImage(guild.bannerURL)
        }

        msg.channel.send("Here's the server information!", embed)

    }
}