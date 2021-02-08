const { sleep } = require('../../basic'); 
const { channels, guilds, prefix, ownerid, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "presenceUpdate",
    description
    : "Event emits on received presence update.",
    run: async (client) => {
        client.on('presenceUpdate', async (oldPresence, newPresence) => {
            console.log('found presenceUpdate')
        
        });
    }
}