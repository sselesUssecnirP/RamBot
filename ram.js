const { Client, MessageEmbed } = require('discord.js');
//const { token } = require("./config/token.json");
const { sleep } = require('./functions/basic')
const { channels, guilds, prefix, ownerid, maid, dogwater } = require('./config/config.json');
const token = process.env.TOKEN

client = new Client({
    disableMentions: 'everyone',
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    presence: {
        status: "online",
        activity: {
            name: "ram! | Ram 1.0.3",
            type: "LISTENING"
        },
        afk: false
    }
})

const collSubmissions = require('./saves/submissions.json');
const fs = require('fs');

client.on('typingStart', async (channel, user) => {
    if (user.id == guilds[1]["ownerid"]) (await channel.send("I see you typing Cole! Better not say anything naughty that'll make Emilia upset!")).delete({ timeout: 2500 })
})

client.on('message', async msg => {


    // Broken Kingdom

    if (msg.channel.type === 'dm' && msg.author.id == ownerid) {
        
        if (msg.content == "getSubmissions") {
            msg.author.send(`submissions.json as of ${new Date()}`, { files: ["./saves/submissions.json"] })
        }

        return;
    } else if (msg.channel.type === 'dm') return;

    if (msg.content.includes(prefix)) {
        let name = msg.author.username
        let dateCreated = msg.createdAt
        let channel = msg.channel.name
        let guild = msg.guild.name
        let author = msg.author

        let args = msg.content.slice(prefix.length).split(/ +/);
        let command = args.shift().toLowerCase();
        args = args.slice(command)

        console.log(args)
        console.log(command)

        if (msg.author.id === dogwater && command != "dogwater") {
            msg.reply("You're too dogwater to run my commands. Try taking a shower and attempting again later!")
            dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
        }


        if (command === 'invite') {
            if (msg.author.id == ownerid) {
        
        /*
                    ********************************************
                    ***          Owner Only Embeds           ***
                    ********************************************
        */
        
                if (msg.guild.id != guilds[0]["id"][0]) {
                        
                    let embed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setColor(83,12,176)
                    .addField("Use this link to invite me to your server:", "https://discord.com/api/oauth2/authorize?client_id=762354168132010044&permissions=8&scope=bot\n\nUse this link to join my Owner's server:\nhttps://discord.brokenkingdom.net", true)
                    .setDescription("Invite links for myself and my Owner's server!")
        
                    msg.reply(embed).catch(() => {
                        msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                        if (msg.guild.members.cache.find((user, index) => {
                            if (user.id === ownerid) {
                                return true
                            } else {
                                if (index === msg.guild.members.cache.array().length - 1) return false;
                            };
                        })) client.users.cache.find((user) => {
                            if (user.id === ownerid) user.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`);
                        });
                    })
                } else if (msg.guild.id == guilds[0]["id"]) {
        
                    let embed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setColor(83,12,176)
                    .addField("Use this link to invite me to your server:", "https://discord.com/api/oauth2/authorize?client_id=762354168132010044&permissions=8&scope=bot", true)
                    .setDescription("Invite link for myself!")
        
                    msg.reply(embed).catch(() => {
                        msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                    })
        
                    
                };
        
        /*
                    ********************************************
                    ***           Maid Only Embeds           ***
                    ********************************************
        */
        
            } else if (msg.author.id == maid) {
                if (msg.guild.id != guilds[0]["id"]) {
                    
                    let embed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setColor(83,12,176)
                    .addField("Use this link to invite me to your server:", "https://discord.com/api/oauth2/authorize?client_id=762354168132010044&permissions=8&scope=bot\n\nUse this link to join my Owner's server:\nhttps://discord.brokenkingdom.net", true)
                    .setDescription("Invite links for myself and my Owner's server!")
        
                    msg.reply("You are not my Owner, but I did recognize you as my Owner's maid! You're permitted to use this command!")
                    msg.react("<:EmiThumbsUp:801972190496423977>")
                    msg.reply(embed).catch(() => {
                        msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                    })
                } else if (msg.guild.id == guilds[0]["id"]) {
        
                    let embed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setColor(83,12,176)
                    .addField("Use this link to invite me to your server:", "https://discord.com/api/oauth2/authorize?client_id=762354168132010044&permissions=8&scope=bot", true)
                    .setDescription("Invite link for myself!")
        
                    msg.reply("You are not my Owner, but I did recognize you as a fellow maid! You're permitted to use this command!").catch(() => {
                        msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                    })
                    msg.react("<:EmiThumbsUp:801972190496423977>").catch(() => {
                        msg.author.send(`I was unable to react to messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                    })
                    msg.reply(embed).catch(() => {
                        msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                    })
                }
            } else {
                msg.react("<:BettyHmph:801972187706818650>").catch(() => {
                    msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                })
                msg.reply("You're not permitted to use my Owner's command. If you were his one of his maids, maybeeeee...").catch(() => {
                    msg.author.send(`I was unable to react to messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                })
            };
        
        /*          Commands
                    ********************************************
                    ***             Submissions              ***
                    ********************************************
        */
        
        } else if (command === 'submissions') {

        /*          Commands
                    ********************************************
                    ***              Skribblio               ***
                    ********************************************
        */
        
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
                .setFooter(`${name} used ${prefix}!${command} ${args.length > 1 ? `${args.join()}` : `${args.join(' ')}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

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
                .setFooter(`${name} used ${prefix}!${command} ${args.length > 1 ? `${args.join()}` : `${args.join(' ')}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

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
                .setFooter(`${name} used ${prefix}!${command} ${args.length > 1 ? `${args.join()}` : `${args.join(' ')}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

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
                .setFooter(`${name} used ${prefix}!${command} ${args.length > 1 ? `${args.join()}` : `${args.join(' ')}`}! It brought up a list of submissions!`, msg.author.displayAvatarURL())

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
            
        /*          Commands
                    ********************************************
                    ***                 Help                 ***
                    ********************************************
        */
        
        } else if (command == 'help') {
            //let embed = new MessageEmbed()
            //    .setAuthor(client.user.username, client.user.displayAvatarURL())
            //    .setColor(83,12,176)
            //    .addField("General", '', { inline: true })
            //    .setFooter(`${name} used ${prefix}!${command}! It made the help embed appear!`, msg.author.displayAvatarURL())
            //
            //    msg.reply(embed)
            msg.reply("Currently, I don't have enough commands to fill a help embed.\nThe available commands are `submissions`, and `invite`!")
                        
        /*          Commands
                    ********************************************
                    ***           getSubmissions             ***
                    ********************************************
        */
        
        } else if (command == 'getsubmissions') {
            if (msg.author.id != ownerid) msg.reply("You're most certainly not my master, and you will not be able to run this command.");

            if (msg.author.id == ownerid) {
                await msg.author.send(`submissions.json as of ${new Date()}`, { files: ["./saves/submissions.json"] })
                msg.reply("Master, I've DM'd you an updated version of submissions.json as you've asked.")
            }
        /*
        } else if (command == 'say') {
            if (args[0] == undefined) {
                msg.reply("You've provided no arguments for the embed. Proper usuage: `ram!say channel:{CHANNEL} color:{COLOR} {MESSAGE}` // `channel:{CHANNEL}` must be a channel mention (#channel_name) -- `color:{COLOR}` must be either an RGB or Hex code. (#FFFFFF or 20, 20, 20)")
                return;
            }

            let channel = false
            let color = false
            let customChannel = false

            if (args[0].includes("channel:")) {
                console.log("custom channel")
                args[0].slice("channel:<#")
                args[0].slice(">")
                channel = msg.guild.channels.cache.find(iChannel => {
                    if (iChannel.id == msg.mentions.channels.first()) return iChannel;
                })
                args.slice(channel)
                customChannel = true

            } else {



            }

            if (args[0].includes('color:#')) {
                console.log("hex color")
                args[0].slice("color:")
                color = args[0]
                args.slice(args[0])

            } else if (args[0].includes('color:') && !args[0].includes('color:#')) {
                console.log("RGB color")
                args[0].slice("color:")
                color = `${args[0]},${args[1]},${args[2]}`
                for (let i = 0; i <= 3; i++) {
                    console.log(args[0])
                    args.slice(args[0]);
                }

            } else {
                console.log("default color")
                color = 83,12,176

            }


            let embed = new MessageEmbed()
                .setAuthor(name, msg.author.displayAvatarURL())
                .setColor(color)
                .addField("Message from ram!say", args.join(' '), { inline: true })

            if (!customChannel) msg.channel.send(embed);    
            if (customChannel) channel.send(embed);
        */
        } else if (command === 'dogwater') {

            let dogK;

            client.users.cache.find(user => {
                if (user.id === dogwater) dogK = user;
            });

            if (msg.author.id === dogK.id) {
                msg.reply("My master tells me you are dogwater, and my master would never lie!")
                dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
            } else if (msg.author.id != dogK.id) {
                msg.reply(`<@!${dogK.id}> is extremely dogwater. My master told me so and my master would never lie.`)
                dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
            } else if (msg.author.id === ownerid) {
                msg.reply(`You told me <@!${dogK.id} is dogwater!`)
                dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
            }
        }

    }

    if (msg.guild.id == guilds[0]["id"][0] || guilds[0]["id"][1]) {
        let name = msg.author.username
        let dateCreated = msg.createdAt
        let channel = msg.channel.name
        let guild = msg.guild.name
        let author = msg.author
        let content = msg.content

        
        if (msg.author.username === client.user.username) { 

            return;

        }

        
        /*          Broken Kingdom
                    ********************************************
                    ***             Submissions              ***
                    ********************************************
        */
        
        if (msg.channel.id == channels[0]["BrokenKingdom"][0] && msg.content.includes(prefix) == false) {


            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .setFooter(`Submission by ${name}`, author.displayAvatarURL())
            .addField("Submission", content)
        
            msg.reply(embed)
            console.log(`${name} submitted ${content} for skribblio custom words`)

            //if (collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {console.log(name)return true;} else if (index = collSubmissions["submissions"]["skribblio"].length) {return false;}})) {let index = collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {return index;}});collSubmissions["submissions"]["skribblio"][0]["message"].push(content)} //else {
        
            collSubmissions["submissions"]["skribblio"].push({name: name, message: content, submitted: dateCreated, channel: channel, guild: guild})
            
            fs.writeFile('./saves/submissions.json', JSON.stringify(collSubmissions, null, '\t'), (err) => {
            if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)

        } else if (msg.channel.news) {

            msg.crosspost()
            .then(() => console.log('Crossposted message'))
            .catch(console.error);

        };


    // The Fruit Basket

    } 
    
    
    if (msg.guild.id == guilds[1]["id"]) {

        if (msg.author.username === client.user.username) { 

            return;

        } else if (msg.channel.id == channels[1]["FruitBasket"][0] && msg.content.includes(prefix) == false) {
            if (msg.author.bot) return;

            let name = msg.author.username
            let content = msg.content
            let dateCreated = msg.createdAt
            let channel = msg.channel.name
            let guild = msg.guild.name

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("Submission", content)
        
            msg.reply(embed)
            console.log(`${name} submitted ${content}`)

            //if (collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {console.log(name)return true;} else if (index = collSubmissions["submissions"]["skribblio"].length) {return false;}})) {let index = collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {return index;}});collSubmissions["submissions"]["skribblio"][0]["message"].push(content)} //else {
        
                collSubmissions["submissions"]["movienight-fb"].push({name: name, message: content, submitted: dateCreated, channel: channel, guild: guild})

            fs.writeFile('./saves/submissions.json', JSON.stringify(collSubmissions, null, '\t'), (err) => {
            if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)

        } else if (msg.channel.id == channels[1]["FruitBasket"][1] && msg.content.includes(prefix) == false) {
            if (msg.author.bot) return;

            let name = msg.author.username
            let content = msg.content
            let dateCreated = msg.createdAt
            let channel = msg.channel.name
            let guild = msg.guild.name

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("Submission", content)
        
            msg.reply(embed)
            console.log(`${name} submitted ${content}`)

            //if (collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {console.log(name)return true;} else if (index = collSubmissions["submissions"]["skribblio"].length) {return false;}})) {let index = collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {return index;}});collSubmissions["submissions"]["skribblio"][0]["message"].push(content)} //else {
        
                collSubmissions["submissions"]["animenight-fb"].push({name: name, message: content, submitted: dateCreated, channel: channel, guild: guild})

            fs.writeFile('./saves/submissions.json', JSON.stringify(collSubmissions, null, '\t'), (err) => {
            if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)

        } else if (msg.channel.id == channels[1]["FruitBasket"][2] && msg.content.includes(prefix) == false) {
            if (msg.author.bot) return;

            let name = msg.author.username
            let content = msg.content
            let dateCreated = msg.createdAt
            let channel = msg.channel.name
            let guild = msg.guild.name

            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .addField("Submission", content)
            .setFooter(name, msg.author.displayAvatarURL())
        
            msg.reply(embed)
            console.log(`${name} submitted ${content}`)

            //if (collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {console.log(name)return true;} else if (index = collSubmissions["submissions"]["skribblio"].length) {return false;}})) {let index = collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {return index;}});collSubmissions["submissions"]["skribblio"][0]["message"].push(content)} //else {
        
                collSubmissions["submissions"]["fb-role-ideas"].push({name: name, message: content, submitted: dateCreated, channel: channel, guild: guild})

            fs.writeFile('./saves/submissions.json', JSON.stringify(collSubmissions, null, '\t'), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)
        };


    // Alex's (Friend's) Server

    }
    
    if (msg.guild.id == guilds[2]["id"]) {

        if (msg.author.username === client.user.username) { 

            return;

        } else if (msg.channel.id == channels[2]["AlexServer"][0] && msg.content.includes(prefix) == false) {
            if (msg.author.bot) return;

            let name = msg.author.username
            let content = msg.content
            let dateCreated = msg.createdAt
            let channel = msg.channel.name
            let guild = msg.guild.name
            let embed = new MessageEmbed().setAuthor(client.user.username, client.user.displayAvatarURL()).setColor(83,12,176).setFooter(`Submission by ${name}`, msg.author.displayAvatarURL()).addField("Submission", content)
        
            msg.reply(embed)
            console.log(`${name} submitted ${content}`)

            //if (collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {console.log(name)return true;} else if (index = collSubmissions["submissions"]["skribblio"].length) {return false;}})) {let index = collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {return index;}});collSubmissions["submissions"]["skribblio"][0]["message"].push(content)} //else {
        
            collSubmissions["submissions"]["movienight-alex"].push({name: name, message: content, submitted: dateCreated, channel: channel, guild: guild})

            fs.writeFile('submissions.json', JSON.stringify(collSubmissions, null, '\t'), (err) => {
            if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)
        };
    };
});

client.on('ready', async () => {

    // (await client.users.cache.get(ownerid)).send("hey I'm online!")

    console.log(`Logged in as ${client.user.tag}`)
});

client.login(token);