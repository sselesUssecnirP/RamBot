

module.exports = {
    name: "debug",
    description: "Event emitted for general debugging information.",
    run: async (client) => {
        client.on('error', error => {
            console.log(error)
        });
    }
}