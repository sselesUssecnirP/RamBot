const { sleep, formatDate, formatDateTime, mentionUser } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "typingStart",
    description: "Event emits on user typing.",
    run: async (client) => {
        client.on('typingStart', async (channel, user) => {
            if (user.id == dogwater) (await channel.send("Say something about dogwater... I dare you.")).delete({ timeout: 2500 })
        });
    }
}