const { sleep } = require('../../basic'); 
const { channels, guilds, prefix, ownerid, maid, dogwater } = require('../../../config/config.json');
const collSubmissions = require('../../../saves/submissions.json')

module.exports = {
    name: "submissions",
    description: "Event emits on message received",
    run: (client, msg, args) => {
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

            if (msg.channel.id == channels["BrokenKingdom"][0] && msg.content.includes(prefix) == false) {


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

    /*          Alex's Server
                ********************************************
                ***             Submissions              ***
                ********************************************
    */

        } else if (msg.guild.id == guilds[1]["id"]) {

            if (msg.author.username === client.user.username) { 

                return;

            } else if (msg.channel.id == channels["AlexServer"][0] && msg.content.includes(prefix) == false) {
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
    }
}