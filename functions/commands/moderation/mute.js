const func = require('../../basic');
const { prefix, master, maid, dogwater } = require('../../../config/config.json');
const message = require('../../events/message/message');
const { writeFile } = require('fs')

module.exports = {
    name: "mute",
    category: "moderation",
    description: "Mutes the mentioned member if the user has permission.",
    aliases: "",
    usage: "none",
    run: async (client, msg, args) => {
        
        if (!msg.member.hasPermission('MUTE_MEMBERS'))
            return msg.reply("You do not have permission to mute members.")

        let member = msg.mentions.members.first() || msg.guild.members.fetch(args[0]) || undefined

        if (!member)
            return msg.reply("You didn't provide a user to mute. You must feel stupid.")

        const guildS = client.guildsColl.get(msg.guild.id) || { name: msg.guild.name, id: msg.guild.id, submitTo: {}, reportTo: {}, submissions: {}, mutedMembers: {}, banNWord: false, permissions: false }
    
        guildS["mutedMembers"][member.id] = { user: { name: member.user.username, id: member.id }, mutedOn: func.formatDate(), mutedBy: { name: msg.member.username, id: msg.member.id } }

        writeFile(`./saves/GuildSaves/${msg.guild.id}`, JSON.stringify(guildS, null, '\t'))

        msg.author.send("I've muted that user, but if s/he is not unmuted after 30 days... the next time they talk, they will be unmuted automatically. You may re-mute them at that time or just before to reset the timer or you may just simply unmute them before if it's a smaller punishment.")
    }
}