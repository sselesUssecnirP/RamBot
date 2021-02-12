const { MessageEmbed, MessageFlags } = require('discord.js')
const { sleep } = require('../../basic'); 
const { prefix, ownerid, maid, dogwater } = require('../../../config/config.json');
const fs = require('fs')

module.exports = {
    name: "submissions",
    description: "Event emits on message received",
    run: (client, msg, args) => {
        client.on('message', async msg => {
            if (msg.author.bot) return;
            if (msg.content.startsWith('!') || msg.content.startsWith('?') || msg.content.startsWith('ram!') || msg.content.startsWith('emi!') || msg.content.startsWith('>>') || msg.content.startsWith('<<') || msg.content.startsWith('>') || msg.content.startsWith('t!')) return;
            
            let coll = client.guildsColl.get(msg.guild.id)
            let key;
            let channelIs = false;
            coll.forEach((value, pKey) => {
                
                if (key == "submitTo") {
                    value.forEach((val, pK) => {
                        if (val == msg.channel.id) {
                            channelIs = true;
                            key = pK;
                        }
                    })
                }
            })

            if (!channelIs) return;

            let nameMatch;
            coll["submissions"][key].forEach((obj, ind) => {
                if (obj.name == msg.author.username) {
                    nameMatch = [true, ind];
                }
            })

            msg.delete({ timeout: 10 })
            let name = msg.author.username
            let dateCreated = msg.createdAt
            let channel = msg.channel.name
            let guild = msg.guild.name
            let content = msg.content

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(msg.member.displayHexColor === "#000000" ? "#FFFFFF" : msg.member.displayHexColor)
            .setFooter(`Submission by ${name} for ${key}`, author.displayAvatarURL())
            .addField("Submission", content)

            msg.reply(embed)
            console.log(`${name} submitted ${content} for ${key} in ${msg.guild.name}`)
            
            if (nameMatch[0]) {
                if (Array.isArray(coll["submissions"][key][1]["message"])) {
                    coll["submissions"][key][1]["message"].push({ submitted: dateCreated, content: content})
                } else {
                    coll["submissions"][key][1]["message"] = [coll["submissions"][key][1]["message"], { dateCreated: dateCreated, content: content }]
                }
            } else if (!nameMatch[0]) {
                coll["submissions"][key].push({name: name, message: [{ submitted: dateCreated, content: content }], channel: channel, guild: guild})
            }

            fs.writeFile(`./saves/GuildSaves/${msg.guild.id}.json`, JSON.stringify(coll, null, '\t'), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        });
    }
}