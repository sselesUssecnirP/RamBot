const { sleep } = require('../../basic'); 
const { prefix, owner, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "givecola",
    category: "fun",
    description: "Gives someone (or yourself) cola",
    aliases: ["cola"],
    usage: "[mention]",
    run: async (client, msg, args) => {

        if (args.length == 0) {
            msg.author.send({ files: ["./files/videos/cola.mp4"]})
        } else {
            if (msg.mentions.members.first()) {
                let user = msg.mentions.members.first()

                user.send(`__**${msg.author.username}:**__`, { files: ["./files/videos/cola.mp4"]})
            }
        }
    }
}