const { Client, MessageEmbed, Collection } = require('discord.js');
//const { token } = require("./config/token.json");
const { sleep } = require('./functions/basic'); 
const { channels, guilds, prefix, ownerid, maid, dogwater } = require('./config/config.json');
const token = process.env.TOKEN
const handlers = ["commands"]


client = new Client({
    disableMentions: 'everyone',
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    presence: {
        status: "online",
        activity: {
            name: "ram! | Ram 1.1.0",
            type: "LISTENING"
        },
        afk: false
    }
})

/*
    Commands
*/

client.commands = new Collection
client.aliases = new Collection

handlers.forEach(handler => {
    require(`./functions/handler/${handler}`)(client);
}); 

/*
    Commands
*/

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

        let args = msg.content.slice(prefix.length).split(/ +/);
        let command = args.shift().toLowerCase();
        args = args.slice(command)

        console.log(args)
        console.log(command)

        if (msg.author.id === dogwater && command != "dogwater") {
            msg.reply("You're too dogwater to run my commands. Try taking a shower and attempting again later!")
            dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
        }


        if (command.length === 0) return;

        let cmd = client.commands.get(command);
        if (!cmd) cmd = client.commands.get(client.aliases.get(command));

        if (cmd)
            cmd.run(client, msg, args, guilds, collSubmissions, ownerid, maid);

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