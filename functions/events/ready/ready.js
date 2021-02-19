const { sleep, formatDate } = require('../../basic'); 
const { prefix, owner, maid, dogwater } = require('../../../config/config.json');
const fs = require('fs')
const aZip = require('adm-zip')

module.exports = {
    name: "ready",
    description: "Event emits when bot is ready for work",
    run: async (client) => {
        client.on('ready', async () => {
            let ready = true;
            // (await client.users.cache.get(owner)).send("hey I'm online!")
        
            console.log(`sselesUssecnirP's maid ${client.user.username} is ready for work!`)

            /*
            while (ready == true) {
                client.usersColl.each(user => {
                    if (Object.keys(user).includes('DM')) {
                        if (user["DM"]["lastMessage"] == formatDate(new Date())) return;
                        let u = client.users.cache.get(user.id)

                        user["DM"]["days"] += 1

                        user["DM"]["lastMessage"] = formatDate(new Date())

                        fs.writeFile(`./saves/UserSaves/${user.id}.json`, JSON.stringify(user, null, '\t'), (err) => {
                            if (err)
                                throw err;
                            console.log(`${user.id}/${user.name} has been saved!`);
                        });

                        if (user.id == owner) {
                            let zip = new aZip();
                            zip.addLocalFolder('./saves')
                            zip.writeZip('./functions/commands/owner/BotSaves.zip')

                            u.send(`Day ${user["DM"]["days"]} of sending you my save files!`, { files: ["functions/commands/owner/BotSaves.zip"] })
                        }

                        if (user.id == owner) return;

                        u.send(`Day ${user["DM"]["days"]} of sending you this:\n\n${user['DM']['message']}${user.id == dogwater ? "\n\nI think some dogs are thirsty over there. You should go quench their thirst!" : ""}`)
                    }
                });

                sleep(360000)
                continue;
            */
        }); // End of ready Event
    }
}