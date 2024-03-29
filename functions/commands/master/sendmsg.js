const { sleep, formatDate, formatDateTime, mentionUser, grabms } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "sendmessage",
    category: "master",
    description: "Allows my master to send a message somewhere after a delay.",
    aliases: ["sendmsg", "smsg", "smessage"],
    usage: "<time_delay>",
    run: async (client, msg, args) => {
        const { message } = require('../../../saves/message.json');

        if (msg.channel.type !== 'DM') {
            let t = func.func.grabms(args[0]).catch(err => {
                if (err)
                    msg.reply(err[1])
            })

            func.sleep(t)

            msg.channel.send(message)
        }
    }
}