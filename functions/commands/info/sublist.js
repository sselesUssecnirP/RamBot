module.exports = {
    name: "sublist",
    category: "info",
    description: "Grab a list of submissions, remove items from, create submissions channels, ",
    aliases: ["submissions"],
    usage: "<listname>",
    run: async (client, msg, args, guilds, collSubmissions, ownerid, maid) => {
/*          Commands
            ********************************************
            ***              Skribblio               ***
            ********************************************
*/

        const { MessageEmbed } = require('discord.js')
        
        if (args[0] == "skribblio") {
            if (!msg.member.hasPermission('MANAGE_GUILD'))  msg.reply('You do not have the proper permission!');
            if (msg.guild.id != guilds[0]["id"][0] || guilds[0]["id"][1]) return;

            let submissions = []

            collSubmissions["submissions"]["skribblio"].forEach((item) => {
                submissions.push(item["message"])
            })

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("Submissions", submissions.join(', '), { inline: true })
            .setFooter(`${msg.author.username} used ${prefix}!${command} ${args.length > 1 ? `${args.join()}` : `${args.join(' ')}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

            msg.reply(embed).catch(() => {
                msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
            })

/*          Commands
            ********************************************
            ***            Idea For Roles            ***
            ********************************************
*/

        } else if (args[0] == "fbroles") {
            if (!msg.member.hasPermission('MANAGE_GUILD')) msg.reply('You do not have the proper permission!');
            if (!msg.guild.id == guilds[1]["id"]) return;

            let submissions = []

            collSubmissions["submissions"]["fb-role-ideas"].forEach((item) => {
                submissions.push(item["message"])
            })

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("Submissions", submissions.join(', '), { inline: true })
            .setFooter(`${msg.author.username} used ${prefix}!${command} ${args.length > 1 ? `${args.join()}` : `${args.join(' ')}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

            msg.reply(embed)

/*          Commands
            ********************************************
            ***            FB Movie Night            ***
            ********************************************
*/

        } else if (args[0] == "fbmovienight") {
            if (!msg.member.hasPermission('MANAGE_GUILD'))  msg.reply('You do not have the proper permission!');
            if (!msg.guild.id == guilds[1]["id"]) return;

            let submissions = []

            collSubmissions["submissions"]["movienight-fb"].forEach((item) => {
                submissions.push(item["message"])
            })

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("Submissions", submissions.join(', '), { inline: true })
            .setFooter(`${msg.author.username} used ${prefix}!${command} ${args.length > 1 ? `${args.join()}` : `${args.join(' ')}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

            msg.reply(embed)

/*          Commands
            ********************************************
            ***            FB Anime Night            ***
            ********************************************
*/

        } else if (args[0] == "fbanimenight") {
            if (!msg.member.hasPermission('MANAGE_GUILD'))  msg.reply('You do not have the proper permission!');
            if (!msg.guild.id == guilds[1]["id"]) return;

            let submissions = []

            collSubmissions["submissions"]["animenight-fb"].forEach((item) => {
                submissions.push(item["message"])
            })

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("Submissions", submissions.join(', '), { inline: true })
            .setFooter(`${msg.author.username} used ${prefix}!${command} ${args.length > 1 ? `${args.join()}` : `${args.join(' ')}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

            msg.reply(embed)
        } else {
            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("ERROR", "You didn't provide any correct details. To use this command, add `skribblio`, `fbmovienight`, `fbanimenight`, or `fbroles` as an argument for the command.", { inline: true })

            msg.reply(embed)
        }
        
    }
}

