module.exports = {
    name: "dogwater",
    category: "fun",
    description: "Calls someone dogwater",
    aliases: ["dogw"],
    usage: "<input>",
    run: async (client, msg, args, guilds, collSubmissions, ownerid, maid) => {
        const { dogwater } = require('../../../config/config.json');
        let dog;

        if (msg.mentions.users.array().length != 1) {
            msg.reply(`You must provide a user mention for this command (you should only provide ONE user mention). When typing \`ram!dogwater\` be sure to also include \`ram!dogwater @Person#2424\` i.e ram!dogwater <@!${msg.author.id}>`)
        } else {
            dog = msg.mentions.users.array()[0]
        }

        let dogK;

        await client.users.cache.find(user => {
            if (user.id === dogwater) dogK = user;
        });

        
        /*
        await client.users.cache.find(user => {
            if (user.id === arg) dog = user;
        });
        */

        if (dog.id === ownerid) msg.reply('My master is not dogwater. Please refrain from insulting him!')
        if (dog.id === maid) msg.reply("My master's other maid is not dogwater.") 
        if (dog.id != ownerid && dog.id != maid) msg.channel.send(`<@!${msg.author.id}> says that <@!${dog.id}> is dogwater!`);
        dogK.send("https://www.youtube.com/watch?v=0KGS0IOzSQQ&list=PLrvwVi0t0h8AYitTAkCXEcGVRxqXXZeeq&index=343")
    }
}