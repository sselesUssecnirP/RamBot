const func = require('../../basic');

module.exports = {
    name: "korone",
    category: "fun",
    description: "Sends the user (or the mentioned user) a 'im die, thank you for ever' video",
    aliases: "none",
    usage: "[mention]",
    run: async (client, msg, args) => {
        
        if (args.length == 0) {
            msg.author.send({ files: ["./files/videos/korone.mp4"]})
        } else {
            if (msg.mentions.members.first()) {
                let user = msg.mentions.members.first()

                user.send(`__**${msg.author.username}:**__`, { files: ["./files/videos/korone.mp4"]})
            }
        }
    }
}