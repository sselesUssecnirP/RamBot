const { sleep } = require('../../basic'); 
const { prefix, ownerid, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "ready",
    description: "Event emits when bot is ready for work",
    run: async (client) => {
        client.on('ready', async () => {

            // (await client.users.cache.get(ownerid)).send("hey I'm online!")
        
            console.log(`sselesUssecnirP's maid ${client.user.username} is ready for work!`)
        });
    }
}