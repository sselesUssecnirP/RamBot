const { sleep, formatDate, formatDateTime, mentionUser } = require('../../basic'); 
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "invite",
    category: "master",
    description: "Allows my master or his other maid to grab an invite link to for me. (And his server if the server it's used in is not his.)",
    aliases: ["inv"],
    usage: "none",
    run: async (client, msg, args, guilds, collSubmissions, master, maid) => {
        const { MessageEmbed } = require('discord.js')


        if (msg.author.id == master) {
        
            /*
                        ********************************************
                        ***          master Only Embeds           ***
                        ********************************************
            */
            
                    if (msg.guild.id != guilds[0]["id"][0]) {
                            
                        let embed = new MessageEmbed()
                        .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setColor(83,12,176)
                        .addField("Use this link to invite me to your server:", "https://discord.com/api/oauth2/authorize?client_id=762354168132010044&permissions=8&scope=bot\n\nUse this link to join my master's server:\nhttps://discord.brokenkingdom.net", true)
                        .setDescription("Invite links for myself and my master's server!")
            
                        msg.reply(embed).catch(() => {
                            msg.author.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                            if (msg.guild.members.cache.find((user, index) => {
                                if (user.id === master) {
                                    return true
                                } else {
                                    if (index === msg.guild.members.cache.array().length - 1) return false;
                                };
                            })) client.users.cache.find((user) => {
                                if (user.id === master) user.send(`I was unable to send messages in ${msg.channel.name} on the server ${msg.guild.name}`);
                            });
                        })
                    } else if (msg.guild.id == guilds[0]["id"][0]) {
            
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
                    if (msg.guild.id != guilds[0]["id"][0]) {
                        
                        let embed = new MessageEmbed()
                        .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setColor(83,12,176)
                        .addField("Use this link to invite me to your server:", "https://discord.com/api/oauth2/authorize?client_id=762354168132010044&permissions=8&scope=bot\n\nUse this link to join my master's server:\nhttps://discord.brokenkingdom.net", true)
                        .setDescription("Invite links for myself and my master's server!")
            
                        msg.reply("You are not my master, but I did recognize you as my master's maid! You're permitted to use this command!")
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
            
                        msg.reply("You are not my master, but I did recognize you as a fellow maid! You're permitted to use this command!").catch(() => {
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
                    msg.reply("You're not permitted to use my master's command. If you were his one of his maids, maybeeeee...").catch(() => {
                        msg.author.send(`I was unable to react to messages in ${msg.channel.name} on the server ${msg.guild.name}`)
                    })
                };
    }
}