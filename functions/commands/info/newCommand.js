const { sleep } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "newCommand",
    category: "newCommand",
    description: "newCommand",
    aliases: ["newCommand"],
    usage: "none",
    run: async (client, msg, args) => {
        if (msg.author.id == master) {
            msg.reply("I thought this command was just a placeholder for you... Why are you using it?")
        } else {
            msg.reply("How did you notice this? This is just supposed to be a placeholder that master left for himself.")
        }
    }
}