const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const { channels, token, guilds, prefix } = require('./config.json');
const collSubmissions = require('./submissions.json')
const fs = require('fs');

client.on('message', async msg => {

    // Broken Kingdom

    if (msg.guild.id == guilds[0]["id"][0] || guilds[0]["id"][1]) {
        let name = msg.author.username
        let dateCreated = msg.createdAt
        let channel = msg.channel.name
        let guild = msg.guild.name
        let author = msg.author
        let content = 0
        let command = 0
        let prefix = 0


        if (msg.content.includes(prefix["BrokenKingdom"])) {

            content = msg.content.slice(prefix["BrokenKingdom"].length).split('/ +/g')
            command = content.shift().toLowerCase()
            prefix = "BK"

        } else if (msg.content.includes(prefix["AlexServer"])) {

            content = content.slice(prefix["BrokenKingdom"].length).split('/ +/g')
            command = content.shift().toLowerCase()
            prefix = "Alex"

        } else if (!msg.content.includes(prefix["BrokenKingdom"])) {

            content = msg.content
            prefix = false

        }; 
        
        if (msg.author.username === client.user.username) { 

            return;

        } else if (msg.channel.id == channels[0]["BrokenKingdom"][0] && prefix == false) {


            let embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(83,12,176)
            .setFooter(`Submission by ${name}`, author.displayAvatarURL())
            .addField("Submission", content)
        
            msg.reply(embed)
            console.log(`${name} submitted ${content} for skribblio custom words`)

            //if (collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {console.log(name)return true;} else if (index = collSubmissions["submissions"]["skribblio"].length) {return false;}})) {let index = collSubmissions["submissions"]["skribblio"].forEach((name, index) => {if (msg.author.username === name) {return index;}});collSubmissions["submissions"]["skribblio"][0]["message"].push(content)} //else {
        
            collSubmissions["submissions"]["skribblio"].push({name: name, message: content, submitted: dateCreated, channel: channel, guild: guild})
            
            fs.writeFile('submissions.json', JSON.stringify(collSubmissions, null, '\t'), (err) => {
            if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)

        } else if (msg.channel.news == true) {

            msg.crosspost()
            .then(() => console.log('Crossposted message'))
            .catch(console.error);

        /*} else if (command[0].includes(prefix["BrokenKingdom"])) {

            if (command[0] === `submissions`) {
                if (content[0] === "skribblio") {
                    let embed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setColor(83,12,176)
                    .addField("Submissions", JSON.stringify(collSubsmissions["submissions"]["skribblio"], null, 2), { inline: true })
                    .setFooter(`${name} used ${command[0]}!${content.join(' ')}! It brought up a list of submissions!`, name.displayAvatarURL())

                    msg.reply(embed)
               }
            }*/

        } else if (prefix == "BK") {

        };











    // The Fruit Basket

    } else if (msg.guild.id == guilds[1]["id"]) {


        if (msg.content.includes(prefix["FruitBasket"])) {

            content = msg.content.slice(prefix["FruitBasket"].length).split('/ +/g')
            command = content.shift().toLowerCase()
            prefix = "FruitBasket"

        } else if (!msg.content.includes(prefix["FruitBasket"])) {

            content = msg.content
            prefix = false

        };

        if (msg.author.username === client.user.username) { 

            return;

        } else if (msg.channel.id == channels[1]["FruitBasket"][0] && prefix == false) {

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

                fs.writeFile('submissions.json', JSON.stringify(collSubmissions), (err) => {
            if (err) throw err;
                console.log('The file has been saved!');
            });

            msg.delete({ timeout: 10 })
            console.log(collSubmissions)
        };














    // Alex's (Friend's) Server

    } else if (msg.guild.id == guilds[2]["id"] && prefix == false) {


        if (msg.author.username === client.user.username) { 

            return;

        } else if (msg.channel.id == channels[2]["AlexServer"][0] && msg.auther.username.includes(prefix["AlexServer"]) == false) {

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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.login(token);