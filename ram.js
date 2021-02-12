const { Client, MessageEmbed } = require('discord.js');
//const { token } = require("./config/token.json");
const token = process.env.TOKEN
const setupEvents = ["collections"]
const handlers = ["commands", "events"]

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

setupEvents.forEach(event => {
    require(`./functions/events/setup/${event}`)(client)
})

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