const { sleep } = require('../../basic'); 
const { channels, guilds, prefix, ownerid, maid, dogwater } = require('../../../config/config.json');
const collSubmissions = require('../../../saves/submissions.json')

module.exports = {
    name: "message",
    description: "Event emits on receiving a message.",
    run: async (client) => {
        client.on('message', async msg => {

            if (msg.author.id == dogwater && msg.content.toLowerCase().includes("dogwater")) {
                
                await msg.delete({ timeout: 10 })
                (await msg.reply("I warned you!")).delete({ timeout: 2500 })

            }       

            // Broken Kingdom

            if (msg.channel.type === 'dm' && msg.author.id == ownerid) {
    
                if (msg.content == "getSubmissions") {
                    msg.author.send(`submissions.json as of ${new Date()}`, { files: ["./saves/submissions.json"] })
                }

                return;
            } else if (msg.channel.type === 'dm') return;

            if (msg.mentions.has(client.user)) {
                if (msg.author.id === ownerid && msg.content.toLowerCase() === "thank you") {
                    msg.reply("There is no need to thank me Master! I'm here to serve you... always.")
                }
            }

            if (msg.content.includes(prefix)) {

                let args = msg.content.slice(prefix.length).split(/ +/);
                let command = args.shift().toLowerCase();
                args = args.slice(command)

                console.log(args)
                console.log(command)

                if (msg.author.id === dogwater && command != "dogwater") {
                    msg.reply("You're too dogwater to run my commands. Try taking a shower and attempting again later!")
                    dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
                    return;
                }


                if (command.length === 0) return;

                let cmd = client.commands.get(command);
                if (cmd == undefined) cmd = client.commands.get(client.aliases.get(command));

                if (cmd) {
                    cmd.run(client, msg, args);
                } else {
                    msg.reply("That command is not valid.")
                }
            };
        });
    }
}
