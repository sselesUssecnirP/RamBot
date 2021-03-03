const { sleep, formatDate, formatDateTime, mentionUser, mentionChannel, mentionRole, grabms } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');
const { writeFile } = require('fs')

module.exports = {
    name: "message",
    category: "master",
    description: "Allows my master to create a message to send somewhere after a delay.",
    aliases: ["msg"],
    usage: "<MESSAGE>",
    run: async (client, msg, args) => {
        const message = require('../../../saves/message.json')


        args.join(' ')

        message["message"] = args

        writeFile('./saves/message.json', JSON.stringify(message, null, '\t'), err => {
            if (err)
                throw err
            console.log('message.json has been saved.')    
        });
    }
}