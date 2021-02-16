const { sleep, formatDate } = require('../../basic'); 
const { prefix, ownerid, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "ready",
    description: "Event emits when bot is ready for work",
    run: async (client) => {
        client.on('ready', async () => {
            let ready = true;
            // (await client.users.cache.get(ownerid)).send("hey I'm online!")
        
            console.log(`sselesUssecnirP's maid ${client.user.username} is ready for work!`)


            
            dw = client.usersColl.get('616807010591047722')

            dwUser = client.users.get(dw.id)

            while (ready == true) {
                if (dw["dogwaterDM"]["lastMessage"] != formatDate(new Date())) {
                    dw["dogwaterDM"]["days"] += 1
                    dwUser.send(`Day ${dw["dogwaterDM"]["days"]} of sending you this video!\n\n\nhttps://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343`)
                    
                    dw["dogwaterDM"]["lastMessage"] = formatDate(new Date())

                    fs.writeFile(`./saves/UserSaves/${dwUser.id}.json`, JSON.stringify(dw, null, '\t'), (err) => {
                        if (err) throw err;
                        console.log('The file has been saved!');
                    });
                }
            }

            useless = client.usersColl.get('160424636369207296')

            uselessUser = client.users.get(useless.id)

            while (ready == true) {
                if (useless["savesDM"]["lastMessage"] != formatDate(new Date())) {
                    useless["savesDM"]["days"] += 1

                    let zip = new aZip();
                    zip.addLocalFolder('./saves')
                    zip.writeZip('./functions/commands/owner/BotSaves.zip')

                    dwUser.send(`Day ${useless["savesDM"]["days"]} of sending you my save files!`, { files: ["functions/commands/owner/BotSaves.zip"] })
                    
                    useless["savesDM"]["lastMessage"] = formatDate(new Date())

                    fs.writeFile(`./saves/UserSaves/${dwUser.id}.json`, JSON.stringify(dw, null, '\t'), (err) => {
                        if (err) throw err;
                        console.log('The file has been saved!');
                    });
                }
            }
        });
    }
}