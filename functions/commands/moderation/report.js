const { sleep } = require('../../basic'); 
const { prefix, ownerid, maid, dogwater } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags')

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention | id>",
    run: async (client, msg, args) => {
        let emilia = msg.guild.members.fetch('765440066495184896')
        if (emilia) {
            msg.reply(`<@!${emilia.id}> is in the discord. Try using her for this command instead! :3`)
        }

        const guild = client.guildsColl.get(msg.guild.id)

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!rMember)
            return msg.reply("I either could not find the user by the ID/Mention or you didn't input any correct arguments.").then(m => m.delete({ timeout: 10000 }));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return msg.reply("You're not allowed to report that member.").then(m => m.delete({ timeout: 10000 }));

        if (!args[1])
            return msg.reply("You didn't provide a reason.").then(m => m.delete({ timeout: 10000 }));

        const channel = msg.guild.channels.cache.get(guild['report'])

        
        if (!channel)
            return message.channel.send("I could not find a `reports` channel!").then(m => m.delete({ timeout: 10000 }));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .setAuthor("Reported Member", rMember.user.displayAvatarURL())
            .addField(stripIndents`**> Member:** ${rMember} (${rMember.id})
            **> Reported by:** ${msg.member} (${msg.member.id})
            **> Reported in:** ${msg.channel}
            **> Reason:** ${args.slice(0).join(" ")}`)

        return channel.send(embed);
    }
}