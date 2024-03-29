const { MessageEmbed, MessageFlags } = require('discord.js')
const func = require('../../basic');
const { prefix, master, maid, dogwater } = require('../../../config/config.json');
const fs = require('fs')

module.exports = {
    name: "submissions",
    description: "Event emits on message received",
    run: async (client, msg, args) => {
        client.on('message', async msg => {
            if (msg.channel.type == 'dm') return;
            if (msg.author.bot) return;
            if (msg.content.startsWith('!') || msg.content.startsWith('?') || msg.content.startsWith('ram!') || msg.content.startsWith('emi!') || msg.content.startsWith('>>') || msg.content.startsWith('<<') || msg.content.startsWith('>') || msg.content.startsWith('t!')) return;
            
            let coll = await client.guildsColl.get(msg.guild.id)
            let key;
            let channelIs = false;
            Object.keys(coll["submitTo"]).forEach(item => {
                if (coll["submitTo"][item] == msg.channel.id) {
                    key = item;
                    channelIs = true;
                }
            })

            if (!channelIs) return;

            let nameMatch = [false];

            await coll["submissions"][key].forEach((obj, ind) => {
                if (obj.name == msg.author.username) {
                    nameMatch = [true, ind];
                }
            });

            msg.delete({ timeout: 200 })
            let name = msg.author.username
            let dateCreated = msg.createdAt
            let channel = msg.channel.name
            let guild = msg.guild.name
            let content = msg.content.toLowerCase()

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(msg.member.displayHexColor === "#000000" ? msg.member.displayHexColor : "#FFFFFF")
            .setFooter(`Submission by ${name} for ${key}`, msg.author.displayAvatarURL())
            .addField("Submission", content)

            msg.reply(embed)
            console.log(`${name} submitted ${content} for ${key} in ${msg.guild.name}`)
            
            if (nameMatch[0]) {
                if (Array.isArray(coll["submissions"][key][nameMatch[1]]["message"])) {
                    coll["submissions"][key][nameMatch[1]]["message"].push({ submitted: dateCreated, content: content})
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