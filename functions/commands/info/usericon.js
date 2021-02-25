const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "usericon",
    category: "info",
    description: "Makes a user's icon bigger and displays the full picture instead of a cut-off circular version.",
    aliases: ["grabicon", "uicon"],
    usage: "[user_ID | user_MENTION]",
    run: async (client, msg, args) => {
        let user;

        if (msg.mentions.users.first()) {
            user = msg.mentions.users.first()
        } else if (args[0]) {
            user = await client.users.fetch(args[0]).catch(() => {
                user = false
            });
        } else 
            user = false;

        let embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setImage(user ? user.user.displayAvatarURL() : msg.author.displayAvatarURL())
        .setFooter(msg.author.username, msg.author.displayAvatarURL())

        msg.reply(embed)
    }
}