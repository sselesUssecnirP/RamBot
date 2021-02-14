const { Client, MessageEmbed } = require('discord.js');
//const { token } = require("./config/token.json");
const token = process.env.TOKEN
const handlers = ["collections", "commands", "events"]

client = new Client({
    disableMentions: 'everyone',
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    presence: {
        status: "online",
        activity: {
            name: "ram! | Ram 1.2.5",
            type: "LISTENING"
        },
        afk: false
    }
})

/*
    Commands
*/

handlers.forEach(handler => {
    require(`./functions/handler/${handler}`)(client);
}); 

console.log(`Aliases Key Array:\n${client.aliases.keyArray()}`)
console.log(`Aliases:\n${client.aliases.array()}`)
console.log(`Commands:\n${client.commands.keyArray()}`)

client.events.each(event => {
    event.run(client)
})
/*
    Commands
*/

client.login(token);