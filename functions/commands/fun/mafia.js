module.exports = {
    name: "mafia",
    category: "fun",
    description: "Decides if you're Mafia or not.",
    aliases: [],
    run: async (client, msg, args, guilds, collSubmissions, ownerid, maid) => {

        if (args[0] === "info") {
            msg.reply("Mafia (in this context) is a mini-game people play inside of another game.\nIt's played with all players on the same team.\nMafia members must try to lose the game and innocents play to win.n\nMafia have to lose the game without getting detected.\nAt the end of game, everyone votes on who they think everyone else is.\nYou get 1 vote for guessing each person's role correctly.\nMafia get 3 points for losing, and innocents get 2 points for winning.\n\n\nI'm not the proper bot to be using for this game mode if you want it to be more customizable. My function is very, very simple for this game.\nInvite https://discord.com/api/oauth2/authorize?client_id=730637239616536576&permissions=10240&scope=bot for a more customizable version.")
            return;
        } 


        let num = Math.floor(Math.random() * 6)

        if (num == 1 || 3) {
            msg.author.send("You are the mafia!")
        } else {
            msg.author.send("You are innocent!")
        }
    }
}