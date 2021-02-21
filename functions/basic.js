module.exports = {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    formatDate(date) {
      return date.toLocaleString('en-US', { timeZone: 'America/New_York' })
    },
    mentionUser(user) {
      return `<@!${user}>`
    }
}