const { readdirSync } = require('fs');

const ascii = require('ascii-table');

const table = new ascii().setHeading("Event", "Load Status")

module.exports = (client) => {
    readdirSync("./functions/events/").forEach(dir => {
        const events = readdirSync(`./functions/events/${dir}`).filter(f => f.endsWith('.js'))

        for (let file of events) {
            let pull = require(`../events/${dir}/${file}`);

            if (!pull.name.startsWith('$')) {
                if (pull.name) {
                    client.events.set(pull.name, pull)
                    table.addRow(file, '✅')
                } 
            } else if (pull.name.startsWith('$')) {
                    client.manualEvents.set(pull.name, pull)
                    table.addRow(file, '✅')
            } else {
                table.addRow(file, '❌ -> missing something??')
                continue;
            }


        }

        
    });

    console.log(table.toString())
}