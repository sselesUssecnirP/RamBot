const { sleep } = require('../../basic'); 
const { channels, guilds, prefix, ownerid, maid, dogwater } = require('../../../config/config.json');
const collSubmissions = require('../../../saves/submissions.json')

module.exports = {
    name: "message",
    description: "Event emits on receiving a message.",
    run: async (client) => {
        client.on('message', async msg => {

            if (msg.author.id == dogwater && msg.content.toLowerCase().includes("dogwater")) {
                
                await msg.delete({ timeout: 10 })
                (await msg.reply("I warned you!")).delete({ timeout: 2500 })
        
            }
        
            // Broken Kingdom
        
            if (msg.channel.type === 'dm' && msg.author.id == ownerid) {
                
                if (msg.content == "getSubmissions") {
                    msg.author.send(`submissions.json as of ${new Date()}`, { files: ["./saves/submissions.json"] })
                }
        
                return;
            } else if (msg.channel.type === 'dm') return;
        
            if (msg.mentions.has(client.user)) {
                if (msg.author.id === ownerid && msg.content.toLowerCase() === "thank you") {
                    msg.reply("There is no need to thank me Master! I'm here to serve you... always.")
                }
            }
        
            if (msg.content.includes(prefix)) {
        
                let args = msg.content.slice(prefix.length).split(/ +/);
                let command = args.shift().toLowerCase();
                args = args.slice(command)
        
                console.log(args)
                console.log(command)
        
                if (msg.author.id === dogwater && command != "dogwater") {
                    msg.reply("You're too dogwater to run my commands. Try taking a shower and attempting again later!")
                    dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
                    return;
                }
        
        
                if (command.length === 0) return;
        
                let cmd = client.commands.get(command);
                if (cmd == undefined) cmd = client.commands.get(client.aliases.get(command));
        
                if (cmd)
                    cmd.run(client, msg, args);
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
        
            // Alex's (Friend's) Server
        
            }
            
            if (msg.guild.id == guilds[1]["id"]) {
        
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
        });
    }
}