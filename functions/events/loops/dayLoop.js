const { sleep, formatDate } = require('../../basic'); 
const { prefix, owner, maid, dogwater } = require('../../../config/config.json');
const fs = require('fs')
const aZip = require('adm-zip')

module.exports = {
    name: "dayLoop",
    description: "Loops constantly runs if it's the next day.",
    run: async (client) => {
            let ready = true;

            while (ready == true) {
                client.usersColl.each(async user => {
                    if (Object.keys(user).includes('DM')) {
                        if (user["DM"]["lastMessage"] == formatDate(new Date())) return;
                        let u = await client.users.fetch(user.id)

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

                await sleep(360000)
                continue;
        }
    }
}