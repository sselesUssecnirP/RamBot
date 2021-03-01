const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "serverinfo",
    category: "info",
    description: "A command to acquire information about a user.",
    aliases: ["whatis", "what", "sinfo"],
    usage: "<username | id | mention>",
    run: async (client, msg, args) => {
        
    if (msg.channel.type == 'DM')
    return msg.reply("This is a direct message. You cannot get information about the server you're in from here.")

    const roles = [];
    
    await msg.guild.roles.cache.each(r => {
        if (roles.name != '@everyone')
            roles.push(`<@&${r.id}>`)
    });

    roles.join(', ')

    const embed = new MessageEmbed()
        .setTitle('Serverinfo')
        .setFooter(msg.guild.name, msg.guild.iconURL)
        .setThumbnail(msg.guild.iconURL)
        .setColor(msg.member.displayHexColor === "#000000" ? "#ffffff" : msg.member.displayHexColor)

        .addField("Guild Information #1", `**>> Name:** ${msg.guild.name}
        **>> ID:** ${msg.guild.id}
        **>> Created At:** ${msg.guild.createdAt}
        **>> Description:** ${msg.guild.description}${msg.guild.rulesChannel ? `
        **>> Rules Channel:** <#${msg.guild.rulesChannelID}>` : ``}
        **>> Population:** ${msg.guild.membersCount}
        **>> Joined At:** ${msg.member.joinedAt}
        **>> Voice Region:** ${msg.guild.region}${msg.guild.vanityURLCode ? `
        **>> Vanity URL:** ${msg.guild.vanityURLCode}
        **>> Vanity URL Uses:** ${msg.guild.vanityURLUses}` : ``}${msg.guild.partnered ? `
        **>> Partnered:** Yes` : ``}${msg.guild.verified ? `
        **>> Verified:** Yes` : ``}`, true)
        
        .setTimestamp()

    if (msg.guild.bannerURL) {
        embed.setImage(msg.guild.bannerURL)
    }

    msg.channel.send("Here's the server information!", embed)
    msg.channel.send(`Here are the server's roles: ${roles}`)

    }
}