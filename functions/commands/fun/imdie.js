module.exports = {
    name: "imdie",
    category: "fun",
    description: "Sends the 'im die, thank you forever' video in the same channel.",
    aliases: [],
    usage: "[mention]",
    run: async (client, msg, args) => {
        
            msg.channel.send(`__**${msg.author.username}:**__`, { files: ["./files/videos/imdie.mp4"]})
    }
}