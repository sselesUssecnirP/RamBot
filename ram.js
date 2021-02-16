const { Client, MessageEmbed } = require('discord.js');
//const { token } = require("./config/token.json");
const { readdirSync } = require('fs')
const token = process.env.TOKEN
const handlers = ["collections", "commands", "events"]

client = new Client({
    disableMentions: 'everyone',
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    presence: {
        status: "online",
        activity: {
            name: "ram! | Ram 1.3.0",
            type: "LISTENING"
        },
        afk: false
    }
});

/*
    Commands
*/

handlers.forEach(handler => {
    require(`./functions/handler/${handler}`)(client);
}); 

client.events.each(event => {
    event.run(client)
})
/*
    Commands
*/

client.login(token);