const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const { channels, token } = require('./config.json');
const fs = require('fs');

let submissions = fs.open('config.json', 'r', (err, fd) => {
    if (err) {
        if (err.code = "ENOENT") {
            console.error(`config.json does not exist`)
            return;
        }

        throw err;
    }

    return (JSON.parse(fd))
});

let newSave = {}

client.on('message', msg => {
    if (msg.channel.id == channels[0] || channels[1]) {
        let name = msg.author.displayname
        let embed = new MessageEmbed().setAuthor(client.user.displayname, client.user.avatarURL).setColor(83,12,176).setFooter(`Submission by ${msg.author.displayname}`, msg.author.avatar).addField("Submission", msg)
        
        msg.reply(embed)
        console.log(`${name} submitted ${msg}`)
        submissions.assign(submissions, {submissions: submissions["submissions"].push({name: name, message: msg})});
        newSave = fs.writeFile('config.json', JSON.stringify(submissions), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });

    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.login(token);