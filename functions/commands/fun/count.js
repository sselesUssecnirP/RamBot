const func = require('../../basic');
const { prefix, master, maid, dogwater } = require('../../../config/config.json');
const { writeFile } = require('fs');
const counter = require('countapi-js');
const classes = require('../../classes')

module.exports = {
    name: "count",
    category: "fun",
    description: "Counts 100 from the specified number! Use New_Number if you're restarting a count. (i.e last number = 100 so do `ram!count 100 1500 101` ... when restarting counting, you'll need to include a timeout between messages.)",
    aliases: [],
    usage: "<Number> [timeout_between_messages_in_ms]",
    run: async (client, msg, args) => {
        
        counter.get('rambk', `${msg.author.id}_count_cd`).then(r => {
            if (r.status === 404) {
                counter.create({ key: `${msg.author.id}_count_cd`, namespace: `rambk`, enable_reset: true })
            }

        });

        let number = args[0]
        let wait = args[1] || undefined
        let cooldown; 
        counter.get('rambk', `${msg.author.id}_count_cd`).then(r => {
            cooldown = r.value || undefined
        });

        if (msg.author.id != master) {
            if (cooldown > 0) {
                return msg.reply(`You're on cooldown for this command! \`${cooldown > 60 ? `${cooldown * 60} minutes` : `${cooldown} seconds`}\``)
            }

            counter.set('rambk', `${msg.author.id}_count_cd`, 180);
        }

        if (number) {
            for (let i = number; i == number + 100; i++) {
                msg.channel.send(i)
                await func.sleep(wait ? wait : 1500)
            }

        }

        if (cooldown > 0) {
            for (let i = 180; i == 0; i--) {
                
                func.sleep(1000)
                counter.set('rambk', `${msg.author.id}_count_cd`, i)
            }
        }
    }
}