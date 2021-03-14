const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs')
const func = require('./functions/basic')
const { newUser, newGuild } = require('./functions/classes')
const token = process.env.TOKEN || require('./config/token.json').TOKEN
const handlers = ["collections", "commands", "events"]

client = new Client({
    disableMentions: 'everyone',
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    presence: {
        status: "online",
        activity: {
            name: "ram! | Ram 1.3.2",
            type: "LISTENING"
        },
        afk: false
    }
});

client.commands = new Collection
client.aliases = new Collection

/*
    Commands
*/

handlers.forEach(async handler => await require(`./functions/handler/${handler}`)(client)); 

client.events.each(event => {
    event.run(client)
})
/*
    Commands
*/

client.login(token);