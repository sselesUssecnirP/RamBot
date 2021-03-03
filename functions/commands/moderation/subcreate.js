const { sleep, formatDate, formatDateTime, mentionUser, mentionChannel, mentionRole, grabms } = require('../../basic'); 

module.exports = {
    name: "subcreate",
    category: "moderation",
    description: "Creates a submissions list.",
    aliases: ["subc", "screate", "scre"],
    usage: "<channel_ID> <list_key>",
    run: async (client, msg, args) => {
        if (args[0] == "" || args[1] == "") {
            msg.reply(`Please provide all of the necessary information! Use info as the first argument to learn how to use this command. \`ram!subc info\``)
            return;
        } 

        let coll = await client.guildsColl.get(msg.guild.id)

        if (msg.mentions.channels.first()) {
            args[0].slice('<@!')
            args[0].slice('>')
        }

        if (args[0] && args[1]) {

            coll["submitTo"][args[1]] = args[0]
            coll["submissions"][args[1]] = []

            fs.writeFile(`./saves/GuildSaves/${msg.guild.id}.json`, JSON.stringify(coll, null, '\t'), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

        } else {
            msg.reply(`Please provide all of the necessary information! Use info as the first argument to learn how to use this command. \`ram!subc info\``)
        }
    }
}