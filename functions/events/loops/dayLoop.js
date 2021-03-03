const { sleep, formatDate, formatDateTime, mentionUser, mentionChannel, mentionRole, grabms } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');
const fs = require('fs')
const aZip = require('adm-zip')

module.exports = {
    name: "dayLoop",
    description: "Loops constantly runs if it's the next day.",
    run: async (client) => {
        /*
            let ready = true;

            while (ready == true) {
                client.usersColl.each(async user => {
                    if (!user) return;
                    if (user == []) return;
                    if (user == {}) return;

                    if (Object.keys(user).includes('DM')) {
                        if (user["DM"]["lastMessage"] == formatDate()) return;
                        let u = await client.users.cache.get(user.id)

                        user["DM"]["days"] += 1

                        user["DM"]["lastMessage"] = formatDate()

                        fs.writeFile(`./saves/UserSaves/${user.id}.json`, JSON.stringify(user, null, '\t'), (err) => {
                            if (err) throw err;
                            console.log('The file has been saved!');
                        });

                        if (user.id == master) {
                            let zip = new aZip();
                            zip.addLocalFolder('./saves')
                            zip.writeZip('./functions/commands/master/BotSaves.zip')

                            u.send(`Day ${user["DM"]["days"]} of sending you my save files!`, { files: ["functions/commands/master/BotSaves.zip"] })
                        }

                        if (user.id == master) return;

                        u.send(`Day ${user["DM"]["days"]} of sending you this:\n\n${user['DM']['message']}${user.id == dogwater ? "\n\nI think some dogs are thirsty over there. You should go quench their thirst!" : ""}`)
                    }
                });

                await sleep(360000)
                continue;
        }
        */
    }
}