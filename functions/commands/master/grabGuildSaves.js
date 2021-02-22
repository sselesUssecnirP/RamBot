const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { prefix, master, maid, keywords, specKeywords, meanKeywords, niceKeywords } = require("../../../config/config.json")
const { sleep, formatDate } = require('../../basic');
const aZip = require('adm-zip')

module.exports = {
    name: "grabbotsaves",
    description: "Allows my master to grab a .zip of all the bots save files.",
    category: "master",
    aliases: ["botsaves", "gbsaves", "gbotsaves", "grabbsaves"],
    usage: "none",
    run: (client, msg, args) => {

        if (msg.author.id == master) {
            console.log("attempting to run aZip")
            let zip = new aZip();
            zip.addLocalFolder('./saves')
            zip.writeZip('./functions/commands/master/BotSaves.zip')

            msg.author.send(`Here are the GuildSaves as you asked! Updated as of ${formatDate()}`, { files: ["functions/commands/master/BotSaves.zip"] })
            msg.reply("Master, I've given you the .zip file you asked for!")
        }
    }
}