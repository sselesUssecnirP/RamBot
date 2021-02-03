module.exports = {
    name: "submissions",
    category: "info",
    description: "Grab a list of submissions, remove items from, create submissions channels, ",
    aliases: ["sublist"],
    usage: "<input>",
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


/*          Commands
    ********************************************
    ***              Skribblio               ***
    ********************************************
*/
if (args[0] === 'remove') {

        if (args[1] == "skribblio") {
            if (!msg.member.hasPermission('ADMINISTRATOR'))  msg.reply('You do not have the proper permission!');
            if (msg.guild.id != guilds[0]["id"][0] || guilds[0]["id"][1]) return;
            if (!Number.isIntegar(args[1])) msg.reply("The argument provided for which item on the skribblio list is not a number.")
            if (args[1] > collSubmissions["skribblio"].length - 1) msg.reply("That number is not an item within the list provided.")

            const filter = (m) => {
                m.author.id === msg.author.id
            }

            let reply = msg.reply(`Are you sure you want to delete this? Submissions > Skribblio > ${collSubmissions["skribblio"][args[1]]["message"]}`)
                .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(c => {
                    const collected = c.array()
                    if (c[0] === 'yes') {
                        reply.delete({ timeout: 10 })
                        collSubmissions["skribblio"].slice(collSubmissions["skribblio"][args[1]])
                        msg.reply("Item was deleted from skribblio submissions")
                    } else if (c[0] === 'no') {
                        reply.delete({ timeout: 10 })
                        msg.reply("Item will not be deleted from skribblio")
                    }
                })
                .catch(() => {
                    reply.delete({ timeout: 10 })
                    msg.reply("You took too long to respond! Deletion cancelled.")
                })

/*          Commands
    ********************************************
    ***            Idea For Roles            ***
    ********************************************
*/

        } else if (args[1] == "fbroles") {
            if (!msg.member.hasPermission('ADMINISTRATOR')) msg.reply('You do not have the proper permission!');
            if (!msg.guild.id == guilds[1]["id"]) return;
            if (Number.isIntegar(args[1]))
            if (args[1] > collSubmissions["fb-role-ideas"].length - 1) msg.reply("That number is not an item within the list provided.")

            const filter = (m) => {
                m.author.id === msg.author.id
            }

            let reply = msg.reply(`Are you sure you want to delete this? Submissions > fbroles > ${collSubmissions["fb-role-ideas"][args[1]]["message"]}`)
                .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(c => {
                    const collected = c.array()
                    if (c[0] === 'yes') {
                        reply.delete({ timeout: 10 })
                        collSubmissions["fb-role-ideas"].slice(collSubmissions["fb-role-ideas"][args[1]])
                        msg.reply("Item was deleted from fbroles submissions")
                    } else if (c[0] === 'no') {
                        reply.delete({ timeout: 10 })
                        msg.reply("Item will not be deleted from fbroles")
                    }
                })
                .catch(() => {
                    reply.delete({ timeout: 10 })
                    msg.reply("You took too long to respond! Deletion cancelled.")
                })

/*          Commands
    ********************************************
    ***            FB Movie Night            ***
    ********************************************
*/

        } else if (args[1] == "fbmovienight") {
            if (!msg.member.hasPermission('ADMINISTRATOR'))  msg.reply('You do not have the proper permission!');
            if (!msg.guild.id == guilds[1]["id"]) return;
            if (Number.isIntegar(args[1]))
            if (args[1] > collSubmissions["movienight-fb"].length - 1) msg.reply("That number is not an item within the list provided.")

            const filter = (m) => {
                m.author.id === msg.author.id
            }

            let reply = msg.reply(`Are you sure you want to delete this? Submissions > movienight > ${collSubmissions["movienight-fb"][args[1]]["message"]}`)
                .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(c => {
                    const collected = c.array()
                    if (c[0] === 'yes') {
                        reply.delete({ timeout: 10 })
                        collSubmissions["movienight-fb"].slice(collSubmissions["movienight-fb"][args[1]])
                        msg.reply("Item was deleted from movienight submissions")
                    } else if (c[0] === 'no') {
                        reply.delete({ timeout: 10 })
                        msg.reply("Item will not be deleted from movienight")
                    }
                })
                .catch(() => {
                    reply.delete({ timeout: 10 })
                    msg.reply("You took too long to respond! Deletion cancelled.")
                })

/*          Commands
    ********************************************
    ***            FB Anime Night            ***
    ********************************************
*/
    

        } else if (args[1] == "fbanimenight") {
            if (!msg.member.hasPermission('ADMINISTRATOR'))  msg.reply('You do not have the proper permission!');
            if (!msg.guild.id == guilds[1]["id"]) return;
            if (Number.isIntegar(args[1]))
            if (args[1] > collSubmissions["animenight-fb"].length - 1) msg.reply("That number is not an item within the list provided.")

            const filter = (m) => {
                m.author.id === msg.author.id
            }

            let reply = msg.reply(`Are you sure you want to delete this? Submissions > animenight > ${collSubmissions["animenight-fb"][args[1]]["message"]}`)
                .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(c => {
                    const collected = c.array()
                    if (c[0] === 'yes') {
                        reply.delete({ timeout: 10 })
                        collSubmissions["animenight-fb"].slice(collSubmissions["animenight-fb"][args[1]])
                        msg.reply("Item was deleted from animenight submissions")
                    } else if (c[0] === 'no') {
                        reply.delete({ timeout: 10 })
                        msg.reply("Item will not be deleted from animenight")
                    }
                })
                .catch(() => {
                    reply.delete({ timeout: 10 })
                    msg.reply("You took too long to respond! Deletion cancelled.")
                })
        
        } else {
            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("ERROR", "You didn't provide any correct details. To use this command, add `skribblio`, `fbmovienight`, `fbanimenight`, or `fbroles` as an argument for the command.", { inline: true })

            msg.reply(embed)
        }
    }
    }
}
