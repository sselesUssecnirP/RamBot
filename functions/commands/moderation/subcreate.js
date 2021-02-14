
module.exports = {
    name: "subcreate",
    category: "moderation",
    description: "Creates a submissions list.",
    aliases: ["subc", "screate", "scre"],
    usage: "<channel_ID> <list_key>",
    run: async (client, msg, args) => {
        if (args[0] == "info") {
            msg.reply("Using this command and providing a channelID/Mention and a list_key will create a submissions box. All messages in that submissions box will be saved and able to be acquired using the key in another command (`ram!sublist`)")
            return;
        }

        let coll = await client.guildsColl.get(msg.guild.id)

        if (msg.mentions.user.first()) {
            args[0].slice('<@!')
            args[0].slice('>')
        }

        if (args[0] && args[1]) {
            if (args[0] == "" || args[1] == "") {
                msg.reply(`Please provide all of the necessary information! \`${this.usage}\` - channel_ID can also be a mention -- list_key should be something like \`movienight\`(A list for movie night submissions)`)
                return;
            }


            coll["submitTo"][args[1]] = args[0]
            coll["submissions"][args[1]] = []

            fs.writeFile(`./saves/GuildSaves/${msg.guild.id}.json`, JSON.stringify(coll, null, '\t'), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

        } else {
            msg.reply(`Please provide all of the necessary information! \`${this.usage}\` - channel_ID can also be a mention -- list_key should be something like \`movienight\`(A list for movie night submissions)`)
        }
    }
}