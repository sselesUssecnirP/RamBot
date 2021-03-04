const func = require('../../basic');
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "newcommand",
    category: "newcommand",
    description: "newcommand",
    aliases: ["newcommand"],
    usage: "none",
    run: async (client, msg, args) => {
        if (msg.author.id == master) {
            msg.reply("I thought this command was just a placeholder for you... Why are you using it?")
        } else {
            msg.reply("How did you notice this? This is just supposed to be a placeholder that master left for himself.")
        }
    }
}