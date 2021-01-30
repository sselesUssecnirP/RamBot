const { Client, MessageEmbed } = require('discord.js');
//const { token } = require("./config/token.json");
const { channels, guilds, prefix, ownerid, maid } = require('./config/config.json');
const token = process.env.TOKEN

client = new Client({
    disableMentions: 'everyone',
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    presence: {
        status: "online",
        activity: {
            name: "ram! | Ram 1.0.0",
            type: "LISTENING"
        },
        afk: false
    }
})

const collSubmissions = require('./saves/submissions.json');
const fs = require('fs');

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
        
                    msg.reply(embed)
                } else if (msg.guild.id == guilds[0]["id"]) {
        
                    let embed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setColor(83,12,176)
                    .addField("Use this link to invite me to your server:", "https://discord.com/api/oauth2/authorize?client_id=762354168132010044&permissions=8&scope=bot", true)
                    .setDescription("Invite link for myself!")
        
                    msg.reply(embed)
        
                    
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
                    msg.reply(embed)
                } else if (msg.guild.id == guilds[0]["id"]) {
        
                    let embed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setColor(83,12,176)
                    .addField("Use this link to invite me to your server:", "https://discord.com/api/oauth2/authorize?client_id=762354168132010044&permissions=8&scope=bot", true)
                    .setDescription("Invite link for myself!")
        
                    msg.reply("You are not my Owner, but I did recognize you as a fellow maid! You're permitted to use this command!")
                    msg.react("<:EmiThumbsUp:801972190496423977>")
                    msg.reply(embed)
                }
            } else {
                msg.react("<:BettyHmph:801972187706818650>")
                msg.reply("You're not permitted to use my Owner's command. If you were his one of his maids, maybeeeee...")
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

                msg.reply(embed)

        /*          Commands
                    ********************************************
                    ***            Idea For Roles            ***
                    ********************************************
        */
        
            } else if (args[0] == "fbroles") {
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

            fs.writeFile('./saves/submissions.json', JSON.stringify(collSubmissions), (err) => {
            if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)

        } else if (msg.channel.id == channels[1]["FruitBasket"][1] && msg.content.includes(prefix) == false) {

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

            fs.writeFile('./saves/submissions.json', JSON.stringify(collSubmissions), (err) => {
            if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)

        } else if (msg.channel.id == channels[1]["FruitBasket"][2] && msg.content.includes(prefix) == false) {

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

            fs.writeFile('./saves/submissions.json', JSON.stringify(collSubmissions), (err) => {
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

            fs.writeFile('submissions.json', JSON.stringify(collSubmissions), (err) => {
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