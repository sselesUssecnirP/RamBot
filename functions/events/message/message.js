const { MessageEmbed } = require('discord.js')
const func = require('../../basic');
const { newUser, newGuild } = require('../../classes')
const { prefix, master, maid, dogwater } = require('../../../config/config.json');
const { writeFile } = require('fs')
const aZip = require('adm-zip')

let runCMD = () => {
    if (msg.content.includes(prefix)) {

        let args = msg.content.slice(prefix.length).split(/ +/);
        let command = args.shift().toLowerCase();
        args = args.slice(command)

        console.log(args)
        console.log(command)

        if (msg.author.id === dogwater && command != "dogwater") {
            let randomDW = Math.ceil(Math.random() * 8)

            if (randomDW > 6) {
                msg.reply("You're too dogwater to run my commands. Try taking a shower and attempting again later!")
                dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
                return;
            }
        }

        if (command.length === 0) return;

        let cmd = client.commands.get(command);

        if (!cmd) cmd = client.commands.get(client.aliases.get(command));

        msg.delete({ timeout: 200 })
    
        if (args[0] == cmd.category.toLowerCase()) {
            msg.reply("Yes, good job! That is indeed what category this command is placed under! I'm so happy you know how to read the basic English that the help menu is written in.")
            return;
        }

        if (userS && cmd && guildS["permissions"]) {
            if (userS["permissions"][msg.guild.id])
                if (!userS["permissions"][msg.guild.id][cmd.name])
                    return msg.reply("You do not have access to this command. ||(This guild has enabled custom permissions)||")
        }

        if (cmd) {
            if (args[0] == "info") {
                msg.reply(`Command Usage: ${prefix}${cmd.name}${cmd.usage != "" ? ` ${cmd.usage}` : ""}\nCommand Aliases: ${cmd.aliases}`)
            } else {
            cmd.run(client, msg, args)
            }
        } else {
            msg.reply("That command is not valid.")
        }
    } else if (msg.crosspostable) {
        msg.crosspost()
        .then(() => console.log('Crossposted message'))
    }
}

module.exports = {
    name: "message",
    description: "Event emits on receiving a message.",
    run: async (client) => {
        client.on('message', async msg => {

            msg.author.fetch()

            const guildS = client.guildsColl.get(msg.guild.id) || undefined
            let userS = client.usersColl.get(msg.author.id) || undefined

            if (guildS) {
                if (guildS["mutedUsers"]) {
                // muted user IF the user was on the muted list.
                    let deleteUser = false;
                    guildS["mutedUsers"].forEach(user => {
                        if (user["user"]["id"] == msg.author.id) {
                            if (user["mutedOn"] !== user["mutedOn"]) {
                                let timeSince = (new Date().getTime() - new Date(user["mutedOn"]).getTime()) / (1000 * 3600 * 24)

                                if (timeSince > 30) {
                                    msg.author.send("You've been muted for more than thirty days. I'm removing your muted status! Don't be naughty again. If do end up being naughty again, they may just ban you.")
                            
                                    deleteUser = true
                                } else if (timeSince <= 30) {
                                
                                    msg.author.send(`You've been muted for ${timeSince} days. If you speak, I will delete your messages immediately.${timeSince == 30 ? "Today happens to be your last day of the mute, so tomorrow (if you speak), I will remove your mute status." : ""}`)
                                    msg.delete({ timeout: 200 })
                                }
                            }
                        }
                    });
                    
                    if (deleteUser) {
                        delete guildS["mutedUsers"][msg.author.id]
                        
                        writeFile(`./saves/GuildSaves/${msg.guild.id}`, JSON.stringify(guildS, null, '\t'), err => {
                            if (err) throw err;
                            console.log("The file has been saved!")
                        });
                    }
                } else if (guildS["permissions"]) {
                    userS = client.usersColl.get(msg.author.id) || undefined
                }
            }

            if (msg.author.id == client.user.id) return;

            if (msg.author.id == dogwater && msg.content.toLowerCase().includes("dogwater")) {
                
                await msg.delete({ timeout: 200 })
                (await msg.reply("I warned you!")).delete({ timeout: 2500 })

            }       

            // Broken Kingdom

            if (msg.channel.type === 'dm' && msg.author.id == master) {
    
                if (msg.content == "grabGuildSaves") {
                    let zip = new aZip();
                    zip.addLocalFolder('./saves')
                    zip.writeZip('./functions/commands/master/BotSaves.zip')
        
                    msg.author.send(`Here are the GuildSaves as you asked! Updated as of ${func.formatDate()}`, { files: ["functions/commands/master/BotSaves.zip"] })
                }

                if (msg.content.startsWith(prefix)) runCMD();

            } else if (msg.channel.type === 'dm') return;

            if (msg.mentions.has(client.user)) {
                if (msg.author.id === master && msg.content.toLowerCase() === "thank you") {
                    msg.reply("There is no need to thank me Master! I'm here to serve you... always.")
                }
            }

            runCMD()
        });
    }
}
