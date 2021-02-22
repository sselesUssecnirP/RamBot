const { sleep } = require('../../basic'); 
const { prefix, master, maid, dogwater, botemojis } = require('../../../config/config.json');
module.exports = {
    name: "subremove",
    category: "moderation",
    description: "Removes a submissions box.",
    aliases: ["subr", "sremove", "srem"],
    usage: "<list_key> <list_item_number>",
    run: async (client, msg, args) => {
/*          Commands
            ********************************************
            ***              Skribblio               ***
            ********************************************
*/ 
            let coll = client.guildsColl.get(msg.guild.id)
            let key = Object.keys(coll["submitTo"]).find(key => key == args[0])
            let keys = Object.keys(coll["submitTo"])

            if (args[0] == key) {
                if (!msg.member.hasPermission('ADMINISTRATOR') && coll["permissions"] == false)  msg.reply('You do not have the proper permission!');
                if (!Number.isIntegar(args[1])) msg.reply(`The argument provided for which item on the ${key} list is not a number.`)

                const filter = (m) => {
                    m.author.id == msg.author.id
                }

                let reply = msg.reply(`Are you sure you want to delete this? ${msg.guild.name} > Submissions > ${key}`)
                    reply.react(botemojis["yesNo"][0])
                    reply.react(botemojis["yesNo"][1])

                    reply
                    .createReactionCollector(filter, { maxEmoji: 1 })
                    .then(c => {
                        const collected = c.array()[0]
                        if (collected === botemojis["yesNo"][0]) {

                            reply.delete({ timeout: 10 })
                            coll["submissions"][key].slice(coll["submissions"][key][args[1]])
                            msg.reply(`${key} submission box was deleted.`)

                        } else if (c === botemojis["yesNo"][1]) {

                            reply.delete({ timeout: 10 })
                            msg.reply(`${key} submission box will not be deleted.`)

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
                .setColor(client.member.displayHexColor == "#000000" ? "#FFFFFF" : client.member.displayHexColor)
                .addField("ERROR", `You didn't provide any correct details. To use this command, add \`${keys.join(', ')}\` as an argument for the command.`, { inline: true })

                msg.reply(embed)
            }
    }
}
