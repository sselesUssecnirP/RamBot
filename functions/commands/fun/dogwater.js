const { sleep } = require('../../basic'); 
const { channels, guilds, prefix, ownerid, maid, dogwater } = require('../../../config/config.json');
const collSubmissions = require('../../../saves/submissions.json');

module.exports = {
    name: "dogwater",
    category: "fun",
    description: "Calls someone dogwater",
    aliases: ["dogw"],
    usage: "<mention | name | id>",
    run: async (client, msg, args) => {
        let dog;

        let dChannel = msg.guild.channels.cache.find(channel => {
            if (channel.name === "dogwater") return channel;
        })

        if (args.length == 0) {
            return msg.reply(`Incorrect usage! Proper usage: \`${this.usage}\``)
        } 
        
        const { dogwater } = require('../../../config/config.json');
        if (msg.mentions.members.array().length > 0) {
            dog = msg.mentions.members.first().id
            console.log(dog)
        } else {
            let dog = args[0]
        }

        let dogK = await client.users.cache.find(user => {
            if (user.id == dogwater) {
                return user;
            }
        })

        await client.users.cache.find((user, index) => {
            if (user.tag === dog) {
                dog = user
            } else if (user.name === dog) {
                dog = user
            } else if (index == client.users.cache.array().length - 1) {
                return msg.reply("Could not find a user by with that name or mention.")
            }
        });


        if (dog.id === ownerid) {
            // if ownerid -- if channel == dogwater

            msg.reply('My master is not dogwater. Please refrain from insulting him!')
            dogK.send(`https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343`)
            return;
        } else if (dog.id === maid) {
            // if maid -- if channel == dogwater

            msg.reply("My master's other maid is not dogwater.")
            dogK.send(`https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343`)
            return;

        } else if (dog.id === client.user.id) {
            // if Ram -- if channel == dogwater

            msg.reply(`I'm not \`dogwater\`. I'm the best maid <@!${ownerid}> has!`)
            dogK.send(`https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343`)
            return;

        } else if (dog.id === '765440066495184896') {
            // if K -- if channel == dogwater

            msg.reply("Miss Emilia is most definitely not dogwater. Although, she can be annoying sometimes.")
            dogK.send(`https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343`)
            return;

        } else { 
            // else if anyone else -- if channel == dogwater

            if (dChannel) {
                dChannel.send(`<@!${msg.author.id}> says that <@!${dog}> is dogwater!`);
                msg.delete({ timeout: 10 })
                dogK.send(`https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343\n\n<@!${msg.author.id}> says that <@!${dog}> is dogwater!`)
            } else {
                msg.reply(`says that <@!${dog}> is dogwater!`);
                msg.delete({ timeout: 10 })
                dogK.send(`https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343\n\n<@!${msg.author.id}> says that <@!${dog}> is dogwater!`)
            }
            
        }
        
    }
}