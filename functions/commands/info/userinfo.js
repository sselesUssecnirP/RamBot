const { sleep, formatDate, formatDateTime, mentionUser } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');
const { formatDate } = require('../../basic');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "userinfo",
    category: "info",
    description: "A command to acquire information about a user.",
    aliases: ["whois", "who", "uinfo"],
    usage: "<username | id | mention>",
    run: async (client, msg, args) => {
        
        if (msg.channel.type == 'DM' && args[0])
            return msg.reply('You cannot call this command in a DM.')

        if (!args[0]) {
            msg.reply("Provide the proper information, and maybe my commands will work. You must give me a username, mention, or ID.")
            return;
        }

        let member = msg.mentions.members.first() ? msg.mentions.members.first() : undefined 
        
        if (!member)
            msg.guild.members.cache.find(user => {
                if (user.id == args[0]) {
                    member = user;
                } else if (user.tag == args[0]) {
                    member = user;
                } else if (user.username == args[0]) {
                    member = user;
                }
            });

        if (!member)
            member = msg.member

        const joined = formatDate(member.joinedAt);

        const roles = member.roles.cache
            .filter(r => r.id != msg.guild.id)
            .map(r => r)
            .join(", ") || "none"
        
        const created = formatDate(member.user.createdAt)

        const embed = new MessageEmbed()
            .setTitle('Userinfo')
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField("Member Information", stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField("User Information", stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Created at:** ${created}`, true)

            .setTimestamp()

        if (member.user.presence.activities.type === "PLAYING") {
            embed.addField('Currently Playing', `**> Name:** ${member.user.presence.activities.name}`, true)
        } else if (member.user.presence.activities.type === "STREAMING") {
            embed.addField('Currently Streaming', `**> Name:** ${member.user.presence.activities.name}`, true)
        } else if (member.user.presence.activities.type === "LISTENING") {
            embed.addField('Currently Listening', `**> Name:** ${member.user.presence.activities.name}`, true)
        }

        msg.channel.send("Here's the user information!", embed)

    }
}