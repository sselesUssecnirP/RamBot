const { sleep } = require('../../basic'); 
const { prefix, ownerid, maid, dogwater, botemojis } = require('../../../config/config.json');
module.exports = {
    name: "subremove",
    category: "moderation",
    description: "Remove items from a submissions list.",
    aliases: ["subr", "sremove", "srem"],
    usage: "<listname | clear> [listname]",
    run: async (client, msg, args) => {
/*          Commands
            ********************************************
            ***              Skribblio               ***
            ********************************************
*/ 
            let coll = client.guildsColl.get(msg.guild.id)
            let key = coll["submitTo"].keys(coll["submitTo"]).find(key => object["submitTo"][key] === msg.id)
            let keys = coll["submitTo"].keys()

            if (args[1] == key) {
                if (!msg.member.hasPermission('ADMINISTRATOR'))  msg.reply('You do not have the proper permission!');
                if (msg.guild.id != guilds[0]["id"][0] || guilds[0]["id"][1]) return;
                if (!Number.isIntegar(args[1])) msg.reply("The argument provided for which item on the skribblio list is not a number.")
                if (args[1] > collSubmissions["skribblio"].length - 1) msg.reply("That number is not an item within the list provided.")

                const filter = (m) => {
                    m.author.id == msg.author.id
                }

                let reply = msg.reply(`Are you sure you want to delete this? Submissions > Skribblio > ${collSubmissions["skribblio"][args[1]]["message"]}`)
                    reply.react(botemojis["yesNo"][0])
                    reply.react(botemojis["yesNo"][1])

                    reply
                    .createReactionCollector(filter, { maxEmoji: 1 })
                    .then(c => {
                        const collected = c.array()[0]
                        if (c === botemojis["yesNo"][0]) {
                            reply.delete({ timeout: 10 })
                            collSubmissions["skribblio"].slice(collSubmissions["skribblio"][args[1]])
                            msg.reply("Item was deleted from skribblio submissions")
                        } else if (c === botemojis["yesNo"][1]) {
                            reply.delete({ timeout: 10 })
                            msg.reply("Item will not be deleted from skribblio")
                        }
                    })
    
    /*          Commands
                ********************************************
                ***             Movie Night              ***
                ********************************************
    */
    
            } else {
                let embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setColor(83,12,176)
                .addField("ERROR", `You didn't provide any correct details. To use this command, add \`${keys.join(', ')}\` as an argument for the command.`, { inline: true })

                msg.reply(embed)
            }
    }
}
