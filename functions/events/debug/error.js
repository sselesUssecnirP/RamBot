

module.exports = {
    name: "error",
    description: "Event emits on client encountering error.",
    run: async (client) => {
        client.on('error', error => {
            console.log(error)
        });
    }
}