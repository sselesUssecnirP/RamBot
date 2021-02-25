const { sleep, formatDate, formatDateTime, mentionUser } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans the mentioned member if the user has permission.",
    aliases: "",
    usage: "none",
    run: async (client, msg, args) => {
        
        let time = true;

        if (!msg.member.hasPermission('BAN_MEMBERS'))
            return msg.reply("You do not have permission to ban members.")

        let member = msg.mentions.members.first() || msg.guild.members.fetch(args[0]) || undefined

        if (!member)
            return msg.reply("You didn't provide a user to ban. You must feel stupid.")

        if (!Number.isInteger(args[1]))
            time = false

        if (time) member.ban(args.filter(a => a !== args[0] || args[1]).join(' '))
        if (!time) member.ban(args.filter(a => a !== args[0]).join(' '))
    }
}