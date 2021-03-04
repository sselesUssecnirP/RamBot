const func = require('../../basic');
const { prefix, master, maid, dogwater } = require('../../../config/config.json');

module.exports = {
    name: "voiceStateUpdate",
    description: "Event emits when voiceStates are updated.",
    run: async (client) => {
        client.on('voiceStateUpdate', (oldState, newState) => {
            if (newState.member.id == dogwater) {
                if (newState.speaking) {
                    let random = Math.ceil(Math.random() * 10)

                    if (random > 5) {
                        newState.setDeaf(true, `He rolled a ${random}!`)
                        newState.setMute(true, `He rolled a ${random}!`)

                        func.sleep(20000)

                        newState.setMute(false, `His 20 second mute has ended.`)
                        newState.setDeaf(false, `His 20 second mute has ended.`)
                    }
                }
            } else if (newState.channel.name == "DiceRoll") {
                if (newState.speaking) {
                    let random = Math.ceil(Math.random() * 4) + Math.ceil(Math.random() * 4) + Math.ceil(Math.random() * 4) + Math.ceil(Math.random() * 4) + Math.ceil(Math.random() * 4)

                    if (random > 12) {
                        newState.setDeaf(true, `He rolled a ${random}!`)
                        newState.setMute(true, `He rolled a ${random}!`)

                        func.sleep(120000)

                        newState.setMute(false, `His 2 minute mute has ended.`)
                        newState.setDeaf(false, `His 2 minute mute has ended.`)
                    }
                }
            }
        })
    }
}