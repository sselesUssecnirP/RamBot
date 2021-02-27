const { sleep, formatDate, formatDateTime, mentionUser } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "ready",
    description: "Event emits when bot is ready for work",
    run: async (client) => {
        client.on('ready', async () => {
            let ready = true;
            // (await client.users.cache.get(master)).send("hey I'm online!")
        
            console.log(`sselesUssecnirP's maid ${client.user.username} is ready for work!`)
            
        }); // End of ready Event
    }
}