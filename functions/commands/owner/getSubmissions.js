module.exports = {
    name: "getsubmissions",
    category: "owner-only",
    description: "Grabs the submissions.json file",
    aliases: ["getsub", "getsublist"],
    run: async (client, msg, args, guilds, collSubmissions, ownerid, maid) => {
        if (msg.author.id != ownerid) msg.reply("You're most certainly not my master, and you will not be able to run this command.");

            if (msg.author.id == ownerid) {
                await msg.author.send(`submissions.json as of ${new Date()}`, { files: ["./saves/submissions.json"] })
                msg.reply("Master, I've DM'd you an updated version of submissions.json as you've asked.")
            }
    }
}