const { sleep, formatDate, formatDateTime, mentionUser } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the mentioned member if the user has permission.",
    aliases: "",
    usage: "none",
    run: async (client, msg, args) => {
        
        if (!msg.member.hasPermission('KICK_MEMBERS'))
            return msg.reply("You do not have permission to kick members.")

        let member = msg.mentions.members.first() || msg.guild.members.fetch(args[0]) || undefined

        if (!member)
            return msg.reply("You didn't provide a user to kick. You must feel stupid.")

        member.kick(args.filter(a => a !== args[0]).join(' '))
    }
}