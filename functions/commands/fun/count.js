const func = require('../../basic');
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "newcommand",
    category: "newcommand",
    description: "newcommand",
    aliases: ["newcommand"],
    usage: "none",
    run: async (client, msg, args) => {
        

        let number = args[0]
        let newNumber = undefined;
        let wait = args[1] || undefined

        if (args[2]) {
            newNumber = args[1]
            wait = args[2]
        }
        if (!newNumber) {
            for (let i = 0; i < number; i++) {
                msg.channel.send(i)
                func.sleep(wait ? wait : 1500)
            }
        } else if (newNumber) {
            for (let i = number; i < number; i++) {
                msg.channel.send(i)
                func.sleep(wait ? wait : 1500)
            }
        }
    }
}