const { getMember, formatDate } = require('../../basic');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "userinfo",
    category: "moderation",
    description: "A command to acquire information about a user.",
    aliases: ["whois", "who"],
    usage: "<username | id | mention>",
    run: async (client, msg, args, guilds, collSubmissions, ownerid, maid) => {
        const member = getMember(msg, args.join(" "));

        const joined = formatDate(member.joinedAt);

        const roles = member.roles
            .filter(r => r.id !== msg.guild.id)
            .map(r => r)
            .join(", ") || "none"
        
        const created = formatDate(member.user.createdAt)

        const embed = new MessageEmbed()
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
        }

        msg.channel.send(embed)

    }
}