const { sleep } = require('../../basic'); 
const { channels, guilds, prefix, ownerid, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "typingStart",
    description: "Event emits on user typing.",
    run: async (client) => {
        client.on('typingStart', async (channel, user) => {
            if (user.id == dogwater) (await channel.send("Say something about dogwater... I dare you.")).delete({ timeout: 2500 })
        });
    }
}