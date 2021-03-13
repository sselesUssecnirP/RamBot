const func = require('../../basic');
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "count",
    category: "fun",
    description: "Counts to the number! Use New_Number if you're restarting a count. (i.e last number = 100 so do `ram!count 100 1500 101` ... when restarting counting, you'll need to include a timeout between messages.)",
    aliases: [],
    usage: "<Number> [timeout_between_messages] [New_Number]",
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