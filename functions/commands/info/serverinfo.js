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

    const joined = formatDate(msg.member.joinedAt);

    const roles = [];
    
    await msg.guild.roles.cache.each(r => {
        if (roles.name != '@everyone')
            roles.push(`<@!${r.id}>`)
    });

    roles.join(', ')
    
    const created = formatDate(msg.guild.createdAt)

    const embed = new MessageEmbed()
        .setTitle('Serverinfo')
        .setFooter(msg.guild.name, msg.guild.iconURL)
        .setThumbnail(msg.guild.iconURL)
        .setColor(msg.member.displayHexColor === "#000000" ? "#ffffff" : msg.member.displayHexColor)

        .addField("Guild Information #1", stripIndents`**> Name:** ${msg.guild.name}
        **>> ID:** ${msg.guild.id}
        **>> Created At:** ${created}
        **>> Description:** ${msg.guild.id}`, true)

        .addField("Roles", stripIndents`**>> Roles:** ${roles}`)
        
        .addField("Info #2", stripIndents`${msg.guild.rulesChannel ? `
        **>> Rules Channel:** <#!${msg.guild.rulesChannelID}>` : ``}
        **>> Population:** ${msg.guild.membersCount}
        **>> Joined At:** ${joined}
        **>> Voice Region:** ${msg.guild.region}`, true)

        .addField("Info #3", stripIndents`${msg.guild.vanityURLCode ? `
        **>> Vanity URL:** ${msg.guild.vanityURLCode}
        **>> Vanity URL Uses:** ${msg.guild.vanityURLUses}` : ``}${msg.guild.partnered ? `
        **>> Partnered:** Yes` : ``}${msg.guild.verified ? `
        **>> Verified:** Yes` : ``}`, true)

        .setTimestamp()

    if (msg.guild.bannerURL) {
        embed.setImage(msg.guild.bannerURL)
    }

    msg.channel.send("Here's the server information!", embed)

    }
}