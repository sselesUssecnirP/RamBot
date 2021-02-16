const { sleep } = require('../../basic'); 
const { prefix, ownerid, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "say",
    category: "moderation",
    description: "",
    aliases: [],
    usage: "<MESSAGE> [hexColor] [channel_ID | channel_MENTION]\nFor <MESSAGE>, write it like this: `Hi,there,people,how,are,you?`. Using commas INSTEAD of space.",
    run: async (client, msg, args) => {
        
        let emilia = await msg.guild.members.cache.get('765440066495184896')
        if (emilia) {
            msg.reply(`Lovely little <@!${emilia.id}> is in the discord. Try using her for this command instead!`)
        }
        
        if (args[0] == undefined) {
            msg.reply(`Try actually giving me information next time! Use \`${prefix}say info\` to know what to give me.`)
            return;
        }

        let defaultColor = '#bc22e3'
        let channel;
        let color = false;
        let customColor = args[1] ? true : false
        let customChannel;

        if (customColor)
            args[1].includes('#') ? null : customColor = false

        if (customColor)
            customChannel = args[2] ? true : false

        if (!customColor)
            customChannel = args[1] ? true : false

        if (customColor) {
            color = args[1]
            args.slice(args[1])
        }

        if (customChannel) {
            channel = msg.mentions.channels.first() || msg.guild.channels.get(args[1])
            args.slice(args[1])
        }

        let embed = new MessageEmbed()
            .setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
            .setColor(color ? color : defaultColor)
            .addField(`Message from ${msg.author.username}`, args.join(' '), { inline: true })
            .setFooter('ram!say')

        if (!customChannel) msg.channel.send(embed);    
        if (customChannel) channel.send(embed);
    }
}