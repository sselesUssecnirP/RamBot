const { Client, MessageEmbed, Collection } = require('discord.js');
const { token } = require("./config/token.json");
//const token = process.env.TOKEN
const handlers = ["commands", "events"]

client = new Client({
    disableMentions: 'everyone',
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    presence: {
        status: "online",
        activity: {
            name: "ram! | Ram 1.2.0",
            type: "LISTENING"
        },
        afk: false
    }
})

/*
    Commands
*/

client.events = new Collection
client.commands = new Collection
client.aliases = new Collection

handlers.forEach(handler => {
    require(`./functions/handler/${handler}`)(client);
}); 

console.log(client.aliases.array())

client.events.each(event => {
    event.run(client)
})
/*
    Commands
*/

client.login(token);