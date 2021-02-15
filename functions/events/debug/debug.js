

module.exports = {
    name: "debug",
    description: "Event emitted for general debugging information.",
    run: (client) => {
        client.on('error', error => {
            console.log(error)
        });
    }
}