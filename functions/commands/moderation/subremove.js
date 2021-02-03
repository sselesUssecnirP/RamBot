module.exports = {
    name: "subremove",
    category: "moderation",
    description: "Remove items from a submissions list.",
    aliases: [""],
    usage: "<listname | clear> [listname]",
    run: async (client, msg, args, guilds, collSubmissions, ownerid, maid) => {
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
    
            } else if (args[1] === "clear") {
                
                if (args[1] == "skribblio") {
                    if (!msg.member.hasPermission('ADMINISTRATOR'))  msg.reply('You do not have the proper permission!');
                    if (msg.guild.id != guilds[0]["id"][0] || guilds[0]["id"][1]) return;
    
                    const filter = (m) => {
                        m.author.id === msg.author.id
                    }
                    
                    const list = []
                    await collSubmissions["submissions"]["skribblio"].forEach(item => {
                        list.push(item["message"])
                    })

                    let reply = msg.reply(`Are you sure you want to clear this list? Submissions > Skribblio > ${list.join("\n")}`)
                        .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(c => {
                            const collected = c.array()
                            if (c[0] === 'yes') {
                                reply.delete({ timeout: 10 })
                                collSubmissions["skribblio"] = []
                                msg.reply("Skribblio list was cleared.")
                            } else if (c[0] === 'no') {
                                reply.delete({ timeout: 10 })
                                msg.reply("Skribblio list will not be cleared.")
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
    
                    const filter = (m) => {
                        m.author.id === msg.author.id
                    }
                    
                    const list = []
                    await collSubmissions["submissions"]["fb-role-ideas"].forEach(item => {
                        list.push(item["message"])
                    })

                    let reply = msg.reply(`Are you sure you want to delete this? Submissions > fbroles > ${list.join('\n')}`)
                        .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(c => {
                            const collected = c.array()
                            if (c[0] === 'yes') {
                                reply.delete({ timeout: 10 })
                                collSubmissions["fb-role-ideas"] = []
                                msg.reply("fbroles list was cleared.")
                            } else if (c[0] === 'no') {
                                reply.delete({ timeout: 10 })
                                msg.reply("fbroles list will not be cleared.")
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
    
                    const filter = (m) => {
                        m.author.id === msg.author.id
                    }

                    const list = []
                    await collSubmissions["submissions"]["skribblio"].forEach(item => {
                        list.push(item["message"])
                    })
    
                    let reply = msg.reply(`Are you sure you want to delete this? Submissions > movienight > ${list.join('\n')}`)
                        .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(c => {
                            const collected = c.array()
                            if (c[0] === 'yes') {
                                reply.delete({ timeout: 10 })
                                collSubmissions["movienight-fb"] = []
                                msg.reply("Movienight (FB) list was cleared.")
                            } else if (c[0] === 'no') {
                                reply.delete({ timeout: 10 })
                                msg.reply("Movienight (FB) list will not be cleared.")
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
                    
                    const list = []
                    await collSubmissions["submissions"]["skribblio"].forEach(item => {
                        list.push(item["message"])
                    })

                    let reply = msg.reply(`Are you sure you want to delete this? Submissions > animenight > ${list.join('\n')}`)
                        .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(c => {
                            const collected = c.array()
                            if (c[0] === 'yes') {
                                reply.delete({ timeout: 10 })
                                collSubmissions["animenight-fb"].slice(collSubmissions["animenight-fb"][args[1]])
                                msg.reply("Animenight (FB) list was cleared.")
                            } else if (c[0] === 'no') {
                                reply.delete({ timeout: 10 })
                                msg.reply("Animenight (FB) list will not be cleared.")
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
}