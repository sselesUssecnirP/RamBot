const { sleep, formatDate, formatDateTime, mentionUser } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "sublist",
    category: "info",
    description: "Grab a list of submissions, remove items from, create submissions channels, ",
    aliases: ["submissions"],
    usage: "<listname>",
    run: async (client, msg, args) => {
     
        if (args[0]) {
            if (!msg.member.hasPermission('MANAGE_GUILD'))  msg.reply('You do not have the proper permission!');

            let submissions = []

            let coll = await client.guildsColl.get(msg.guild.id)
            let key;
            let keys = Object.keys(coll["submitTo"])
            
            keys.forEach(item => {
                if (coll["submitTo"][item] == msg.channel.id) {
                    key = item;
                }
            });

            if (coll["submissions"][key] == []) {
                msg.reply("No one has submitted anything to this submissions box yet.")
                return;
            }

            coll["submissions"][key].forEach((obj) => {
                obj["message"].forEach((message) => {
                    submissions.push(message["content"])
                })
            })

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(msg.member.displayHexColor == "#000000" ? msg.member.displayHexColor : "#FFFFFF")
            .addField("Submissions", submissions.join(', '), { inline: true })
            .setFooter(`${msg.author.username} used ram!sublist ${args.length > 1 ? `${args.join(' ')}` : `${args.join()}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

            msg.reply(embed).catch(() => {
                msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
            });
        } else {
            msg.reply("You need to include the list_key of which list you want to take a look at!\nYou provided a list_key when you created the submissions box.\nIt's also shown at the end of every embed in the box.")
        }
    }
}

