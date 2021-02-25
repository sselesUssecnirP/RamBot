module.exports = {
  sleep(ms = 10000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  formatDate(date = new Date(), timeZone = 'America/New_York') {
    date.toLocaleString('en-US', { timeZone: timeZone }).split(', ')

    return date[1]
  },

  formatDateTime(date = new Date(), timeZone = 'America/New_York') {
    return date.toLocaleString('en-US', { timeZone: timeZone })
  },

  mentionUser(userid = "none") {
    if (userid === "none")
        throw "No userid was given."
    return `<@!${userid}>`
  }
}